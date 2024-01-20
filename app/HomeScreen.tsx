import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MidSectionBtns from './components/MidSectionBtns';
import { useRouter } from 'expo-router';

const home = () => {
  const route = useRouter();
  return (
    <ScrollView style={styles.wrapper}>
      <LinearGradient colors={['#7f7fd5', '#e9e4f0']} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerItems}>
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={styles.headerText}>Team-Sync</Text>
            <Entypo name="lock" size={24} color="black" />
          </View>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.listButton} onPress={() => route.push('/EmployeeList')}>
            <View style={styles.iconContainer}>
              <Ionicons name="ios-people-sharp" size={24} color="black" />
            </View>
            <Text>Employee List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButton} onPress={() => route.push('/MarkAttendance')}>
            <View style={styles.iconContainer}>
              <Ionicons name="ios-people-sharp" size={24} color="black" />
            </View>
            <Text>Mark Attendance</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.midSection}>
          <MidSectionBtns title={'Attendance Report'} iconName={'newspaper'} />
          <MidSectionBtns title={'Summary Report'} iconName={'document-text'} />
          <MidSectionBtns title={'All Generate Reports'} iconName={'file-tray-full'} />
          <MidSectionBtns title={'Overtime Employees'} iconName={'timer'} />
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.btnsContainer}>
            <View style={[styles.bottomBtn, { backgroundColor: '#bdc3c7' }]}>
              <View style={styles.squareIconContainer}>
                <Ionicons name="checkmark-circle-outline" size={24} />
              </View>
              <Text>Attendance Criteria</Text>
            </View>
            <View style={[styles.bottomBtn, { backgroundColor: '#4ef3ef' }]}>
              <View style={styles.squareIconContainer}>
                <Ionicons name="file-tray-stacked" size={24} />
              </View>
              <Text>Increased workflow</Text>
            </View>
          </View>
          <View style={styles.btnsContainer}>
            <View style={[styles.bottomBtn, { backgroundColor: '#9af4de' }]}>
              <View style={styles.squareIconContainer}>
                <Ionicons name="cash" size={24} />
              </View>
              <Text>Cost Savings</Text>
            </View>
            <View style={[styles.bottomBtn, { backgroundColor: 'orange' }]}>
              <View style={styles.squareIconContainer}>
                <Ionicons name="happy" size={24} />
              </View>
              <Text>Employee Perfomance</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e9e4f0',
  },
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },
  header: {},
  headerItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  listButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d3cce3',
    padding: 12,
    borderRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50 / 2,
  },
  midSection: {
    backgroundColor: '#FFFF',
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  bottomSection: {
    flexDirection: 'column',
    gap: 20,
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  bottomBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  squareIconContainer: {
    height: 30,
    width: 30,
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
