const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
import moment from 'moment';

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb+srv://davouma13:davouma13@cluster0.7fkbve5.mongodb.net/')
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error: any) => {
    console.log('Error connecting to mongoDB', error);
  });

app.listen(port, () => {
  console.log('server is running on port 8000');
});

const EmployeeData = require('./models/employee');
const AttendanceData = require('./models/attendance');

//endpoint to register an employee
app.post('/addEmployee', async (req: any, res: any) => {
  try {
    const {
      employeeId,
      employeeName,
      designation,
      joiningDate,
      dateOfBirth,
      salary,
      activeEmployee,
      phoneNumber,
      address,
    } = req.body;

    const newEmployee = new EmployeeData({
      employeeId,
      employeeName,
      designation,
      joiningDate,
      dateOfBirth,
      salary,
      activeEmployee,
      phoneNumber,
      address,
    });
    await newEmployee.save();

    res.status(201).json({ message: 'Employee saved successfully', employee: newEmployee });
  } catch (error) {
    console.log(error);
  }
});

//endpoint to fetch all user

app.get('/employees', async (req: any, res: any) => {
  try {
    const employees = await EmployeeData.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to Retrieve the employees' });
  }
});

//endpoint to register attendance data

app.post('/attendance', async (req: any, res: any) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;

    const existingAttendance = await AttendanceData.findOne({
      employeeId,
      date,
    });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new AttendanceData({
        employeeId,
        employeeName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting attendance' });
  }
});

app.get('/attendance', async (req: any, res: any) => {
  try {
    const { date } = req.query;
    const attendance = await AttendanceData.find({ date: date });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendace data' });
  }
});

app.get('/attendance-report-all-employees', async (req: any, res: any) => {
  try {
    const { month, year } = req.query;

    console.log('Query parameters:', month, year);
    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();

    // Aggregate attendance data for all employees and date range
    const report = await AttendanceData.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: '$date' } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: '$date' } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },

      {
        $group: {
          _id: '$employeeId',
          present: {
            $sum: {
              $cond: { if: { $eq: ['$status', 'present'] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ['$status', 'absent'] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ['$status', 'halfday'] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ['$status', 'holiday'] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'employees', // Name of the employee collection
          localField: '_id',
          foreignField: 'employeeId',
          as: 'employeeDetails',
        },
      },
      {
        $unwind: '$employeeDetails', // Unwind the employeeDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: '$employeeDetails.employeeName',
          designation: '$employeeDetails.designation',
          salary: '$employeeDetails.salary',
          employeeId: '$employeeDetails.employeeId',
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error('Error generating attendance report:', error);
    res.status(500).json({ message: 'Error generating the report' });
  }
});
