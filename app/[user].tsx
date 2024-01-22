import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import axios from "axios";

const User = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendance] = useState<string>('present');
  const [currentDate, setCurrentDate] = useState(moment());

    const goToNextDay = () => {
      const nextDate = moment(currentDate).add(1, 'days');
      setCurrentDate(nextDate);
    };

    const goToPrevDay = () => {
      const prevDate = moment(currentDate).subtract(1, 'days');
      setCurrentDate(prevDate);
    };
  
    const formDate = (date: any) => {
      return date.format('MMMM D, YYYY');
    };
  
  const submitAttendace = async () => {
    try {
      const attendance = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: currentDate.format("MMMM D, YYYY"),
        status: attendanceStatus,
      }
      const response = await axios.post(
        "http://10.0.2.2:8000/attendance",
        attendance
      );

      if (response.status === 200) {
        Alert.alert(`Attendance submitted success`)
      }
    }
  }

  return (
    <View>
      <Text>User</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
