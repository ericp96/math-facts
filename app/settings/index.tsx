import { StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '../../components/library/Themed';
import { useQuery } from '@realm/react';
import { UserConfig } from '../../models/UserConfigModel';
import { router } from 'expo-router';
import { OperatorConfig } from '../../models/OperatorConfigModel';
import { Operator } from '../../constants/Enum';
import Realm from 'realm';
import { MonoText } from '../../components/library/StyledText';

function useSelectOperatorConfig(configs: Realm.Results<OperatorConfig>, operator: Operator) {
  const [config] = configs.filtered('$0 == operator', operator);
  return config;
}

export default function SettingsMenuScreen() {
  const [userConfig] = useQuery(UserConfig);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push('/settings/profile');
        }}
        style={styles.userInfoWrapper}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Name
        </MonoText>
        <MonoText style={styles.userInfoName} lightColor="#000" darkColor="#000">
          {userConfig?.name}
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push('/settings/addition');
        }}
        style={styles.gameButton}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Addition
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push('/settings/subtraction');
        }}
        style={styles.gameButton}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Subtraction
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push('/settings/multiplication');
        }}
        style={styles.gameButton}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Multiplication
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push('/settings/division');
        }}
        style={styles.gameButton}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Division
        </MonoText>
      </TouchableOpacity>
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
  userInfoWrapper: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: '#b2cdf7',
  },
  userInfoName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameButton: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#855797',
    borderRadius: 10,
    width: '70%',
    backgroundColor: '#b2cdf7',
    alignItems: 'center',
  },
});
