const mongoseAttend = require('mongoose');

const attendanceSchema = new mongoseAttend.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Attendance = mongoseAttend.model('Attendance', attendanceSchema);

module.exports = Attendance;
