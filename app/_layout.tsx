import "react-native-get-random-values";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { AppRegistry, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { RealmProvider, useQuery, useRealm } from "@realm/react";
import { OperatorConfig } from "../models/OperatorConfigModel";
import { UserConfig } from "../models/UserConfigModel";
import { BSON } from "realm";
import { PreferenceConfig } from "../models/PreferenceConfigModel";
import { useNeedsOnboarding } from "../hooks/useOnboarding";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useAppSetup() {
  const realm = useRealm();
  const operatorConfigs = useQuery(OperatorConfig);
  const users = useQuery(UserConfig);
  const hasDoneSetup = useRef(false);

  useEffect(() => {
    if (hasDoneSetup.current) {
      return;
    }
    hasDoneSetup.current = true;

    // Set the operator config if it doesn't exist, migration for existing users
    if (
      users.length === 1 &&
      operatorConfigs.length > 0 &&
      operatorConfigs.some((config) => config.userId != users[0]._id)
    ) {
      realm.write(() => {
        operatorConfigs.forEach((config) => {
          config.userId = users[0]._id;
        });

        realm.create("PreferenceConfig", {
          _id: new BSON.ObjectID(),
          currentUser: users[0]._id,
        });
      });
    }

    // Migration: Fix PreferenceConfig that has invalid currentUser
    if (users.length > 0 && operatorConfigs.length > 0) {
      const preferences = realm.objects("PreferenceConfig");
      if (preferences.length > 0) {
        const pref = preferences[0] as any;
        if (!users.some(user => user._id.equals(pref.currentUser))) {
          realm.write(() => {
            pref.currentUser = users[0]._id;
          });
        }
      } else {
        realm.write(() => {
          realm.create("PreferenceConfig", {
            _id: new BSON.ObjectID(),
            currentUser: users[0]._id,
          });
        });
      }
    }
  }, [realm, operatorConfigs, users]);
}

function InitializeApp() {
  // useAppSetup();

  return null;
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
        <InitializeApp />
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppNavigator />
        </ThemeProvider>
      </RealmProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent("Math Facts", () => RootLayout);
