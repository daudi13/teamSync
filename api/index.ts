const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
