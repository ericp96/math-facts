import 'react-native-get-random-values';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { AppRegistry, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { RealmProvider, useQuery, useRealm } from '@realm/react';
import { OperatorConfig } from '../models/OperatorConfigModel';
import { UserConfig } from '../models/UserConfigModel';
import { OperatorDefaults } from "../constants/ConfigDefaults";
import { Operator } from "../constants/Enum";
import { BSON } from "realm";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useAppSetup() {
  const realm = useRealm();
  const operatorConfigs = useQuery(OperatorConfig);
  const users = useQuery(UserConfig);

  useEffect(() => {
    if (users.length === 1 
      && operatorConfigs.length > 0 
      && operatorConfigs.some(config => config.userId != users[0]._id)
    ) {
      realm.write(() => {
        operatorConfigs.forEach(config => {
          config.userId = users[0]._id;
        })

        realm.create('PreferenceConfig', {
          _id: new BSON.ObjectID(),
          currentUser: users[0]._id,
        })
      });
    }

    if (operatorConfigs.length === 0) {
      const userId = new BSON.ObjectID();
      realm.write(() => {
        Object.values(Operator).forEach((operator) => {
          realm.create("OperatorConfig", {
            _id: new BSON.ObjectID(),
            enabled: true,
            config: OperatorDefaults[operator],
            operator,
            userId,
          });
        });

        realm.create("UserConfig", {
          _id: userId,
          name: "Kid",
          examTime: 60,
          showTimer: true,
        });

        realm.create('PreferenceConfig', {
          _id: new BSON.ObjectID(),
          currentUser: users[0]._id,
        });
      });
    }
  }, [realm, operatorConfigs, users]);
}

function InitializeApp() {
  useAppSetup();
  return null;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

const backSettings = { headerBackVisible: true, fullScreenGestureEnabled: true };

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <RealmProvider schema={[UserConfig, OperatorConfig]} schemaVersion={1} deleteRealmIfMigrationNeeded={true}>
        <InitializeApp />
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="practice" options={{ ...backSettings, title: 'Practice' }} />
            <Stack.Screen name="exam" options={{ ...backSettings, title: 'Go!' }} />
            <Stack.Screen
              name="settings"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </RealmProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Math Facts', () => RootLayout);

