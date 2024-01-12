import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" />
    </Stack>
  );
}
