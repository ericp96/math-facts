import { StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '../../components/library/Themed';
import { Stack } from 'expo-router';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ title: 'Update Profile' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    margin: 10,
    marginBottom: 0,
    fontWeight: 'bold',
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    margin: 10,
  },
});
