import { Stack } from 'expo-router';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

const backSettings = { headerBackVisible: true, fullScreenGestureEnabled: true };

export default function SettingsLayoutNav() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          ...backSettings,
          title: 'Settings',
        }}
      />
      <Stack.Screen name="profile" options={{ ...backSettings, title: 'User Information' }} />
      <Stack.Screen name="addition" options={{ ...backSettings, title: 'Addition Settings' }} />
      <Stack.Screen name="subtraction" options={{ ...backSettings, title: 'Subtraction Settings' }} />
      <Stack.Screen name="division" options={{ ...backSettings, title: 'Division Settings' }} />
      <Stack.Screen name="multiplication" options={{ ...backSettings, title: 'Multiplication Settings' }} />
    </Stack>
  );
}
