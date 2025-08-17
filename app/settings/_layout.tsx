import { Stack } from "expo-router";

const backSettings = { headerBackVisible: true };

export default function SettingsLayoutNav() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          ...backSettings,
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{ ...backSettings, title: "User Settings" }}
      />
      <Stack.Screen
        name="users"
        options={{ ...backSettings, title: "Users" }}
      />
      <Stack.Screen
        name="addition"
        options={{ ...backSettings, title: "Addition Settings" }}
      />
      <Stack.Screen
        name="subtraction"
        options={{ ...backSettings, title: "Subtraction Settings" }}
      />
      <Stack.Screen
        name="division"
        options={{ ...backSettings, title: "Division Settings" }}
      />
      <Stack.Screen
        name="multiplication"
        options={{ ...backSettings, title: "Multiplication Settings" }}
      />
    </Stack>
  );
}
