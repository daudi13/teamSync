import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import axios from 'axios';

const MarkAttendace = () => {
  const route = useRouter();
  const [currentDate, setCurrentDate] = useState<any>(moment());

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

  const [employees, setEmployees] = useState<any>([]);
  const [attendance, setAttendance] = useState<any>([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/employees');
        setEmployees(response.data);
      } catch (error) {
        console.log('error fetching employee data');
      }
    };
    fetchEmployeeData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/attendance', {
        params: {
          date: currentDate.format('MMMM D, YYYY'),
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log('error fetching attendance data', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  const employeeWithAttendance: any = employees.map((employee: any) => {
    const attendanceRecord = attendance.find(
      (record: any) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : '',
    };
  });

  console.log(employees);
  console.log(currentDate);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          onPress={() => goToPrevDay()}
          size={24}
          color="black"
        />
        <Text>{formDate(currentDate)}</Text>
        <Ionicons
          name="chevron-forward-outline"
          onPress={() => goToNextDay()}
          size={24}
          color="black"
        />
      </View>
      <View style={styles.outerBox}>
        {employeeWithAttendance.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() =>
                route.push({
                  pathname: '/[user]',
                  params: {
                    name: item?.employeeName,
                    id: item?.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  },
                })
              }
              key={index}
              style={styles.wrapper}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxText}>{item?.employeeName?.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.name}>{item?.employeeName}</Text>
                <Text>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default MarkAttendace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    gap: 20,
  },
  boxContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
    marginBottom: 20,
    borderRadius: 10,
  },
  boxText: {
    fontSize: 21,
    fontWeight: '900',
    color: 'white',
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
  },
  outerBox: {
    marginTop: 30,
  },
});
