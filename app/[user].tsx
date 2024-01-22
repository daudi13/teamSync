import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';

const User = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendance] = useState<string>('present');
  const [currentDate, setCurrentDate] = useState(moment());

  console.log(params.name);

  return (
    <View>
      <Text>User</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
