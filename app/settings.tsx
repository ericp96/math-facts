import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/library/Themed';
import { useCallback, useState } from 'react';
import { useQuery, useRealm } from '@realm/react';
import { UserConfig } from '../models/UserConfigModel';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const realm = useRealm();
  const [userConfig] = useQuery(UserConfig);
  const [input, setInput] = useState(userConfig?.name);

  const saveName = useCallback(() => {
    if (userConfig != null) {
      realm.write(() => {
        userConfig.name = input;
      });
    } else {
      realm.write(() => {
        realm.create('UserConfig', { _id: new Realm.BSON.ObjectID(), name: input });
      });
    }
    router.replace('/');
  }, [input, realm, userConfig]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textBox} editable onChangeText={(text) => setInput(text)} value={input} />

      <View>
        <Button title="Save" onPress={saveName} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  label: {
    margin: 10,
    marginBottom: 0,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    margin: 10,
  },
});
