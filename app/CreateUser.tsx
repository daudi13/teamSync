import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import axios from 'axios';

const CreateUser = () => {
  const route = useRouter();

  const [name, setName] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [joiningDate, setJoiningDate] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');

  const handleRegistration = async () => {
    const employeeData = {
      employeeName: name,
      employeeId: employeeId,
      designation: designation,
      phoneNumber: phoneNumber,
      joiningDate: joiningDate,
      address: address,
      activeEmployee: true,
      salary: salary,
      dateOfBirth: dateOfBirth,
    };

    axios
      .post('http://10.0.2.2:8000/addEmployee', employeeData)
      .then((response) => {
        Alert.alert('Registration Successfull', 'You have been registered successfully');

        setName('');
        setAddress('');
        setEmployeeId('');
        setAddress('');
        setPhoneNumber('');
        setDesignation('');
        setDateOfBirth('');
        setSalary('');
      })
      .catch((error: any) => {
        console.log('registration failed!', error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            onPress={() => route.back()}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Add Employee</Text>
          <TextInput placeholder="India" style={styles.input} />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Employee name</Text>
          <TextInput
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Add full name"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Employee ID</Text>
          <TextInput
            value={employeeId}
            onChangeText={(employeeId) => setEmployeeId(employeeId)}
            placeholder="Add employee ID"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            value={designation}
            onChangeText={(designation) => setDesignation(designation)}
            placeholder="Designation"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Joining date</Text>
          <TextInput
            value={joiningDate}
            onChangeText={(joiningDate) => setJoiningDate(joiningDate)}
            placeholder="Joining date"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>date of birth</Text>
          <TextInput
            value={dateOfBirth}
            onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
            placeholder="date of birth"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Salary</Text>
          <TextInput
            value={salary}
            onChangeText={(salary) => setSalary(salary)}
            placeholder="salary"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBoxActive}>
          <Text style={styles.label}>Active Empoyee</Text>
          <Text>True</Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            placeholder="Phone number"
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={(address) => setAddress(address)}
            placeholder="Address"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={() => handleRegistration()}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: '#D3D3D3',
    borderRadius: 15,
    borderWidth: 2,
  },
  inputBox: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  inputBoxActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  submitBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#2b51c6',
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
