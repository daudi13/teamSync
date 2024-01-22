import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" />
      <Stack.Screen name="EmployeeList" />
      <Stack.Screen name="MarkAttendance" />
      <Stack.Screen name="CreateUser" />
      <Stack.Screen name="[user]" />
    </Stack>
  );
}
