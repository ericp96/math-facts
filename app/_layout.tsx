import "react-native-get-random-values";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { AppRegistry, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { RealmProvider } from "@realm/react";
import { OperatorConfig } from "../models/OperatorConfigModel";
import { UserConfig } from "../models/UserConfigModel";
import { PreferenceConfig } from "../models/PreferenceConfigModel";
import { useNeedsOnboarding } from "../hooks/useOnboarding";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const backSettings = {
  headerBackButtonDisplayMode: "minimal",
  fullScreenGestureEnabled: true,
};

function AppNavigator() {
  const needsOnboarding = useNeedsOnboarding();

  return (
    <Stack initialRouteName={needsOnboarding ? "onboarding" : "index"}>
      <Stack.Screen 
        name="onboarding" 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
        }} 
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="practice"
        options={{ ...backSettings, title: "Practice" }}
      />
      <Stack.Screen
        name="exam"
        options={{ ...backSettings, title: "Go!" }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <RealmProvider
        schema={[UserConfig, OperatorConfig, PreferenceConfig]}
        schemaVersion={1}
        deleteRealmIfMigrationNeeded={true}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppNavigator />
        </ThemeProvider>
      </RealmProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

AppRegistry.registerComponent("Math Facts", () => RootLayout);
