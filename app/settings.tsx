import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/library/Themed';
import { useCallback, useState } from 'react';
import { useQuery, useRealm } from '@realm/react';
import { UserConfig } from '../models/UserConfigModel';
import { router } from 'expo-router';
import SubmitButton from '../components/library/SubmitButton';
import OperatorAdditionSettings from '../components/settings/OperatorAdditionSettings';
import OperatorSubtractionSettings from '../components/settings/OperatorSubtractionSettings';
import OperatorMultiplicationSettings from '../components/settings/OperatorMultiplicationSettings';
import OperatorDivisionSettings from '../components/settings/OperatorDivisionSettings';
import { OperatorConfig } from '../models/OperatorConfigModel';
import { Operator } from '../constants/Enum';

export default function SettingsScreen() {
  const realm = useRealm();
  const [userConfig] = useQuery(UserConfig);
  const [input, setInput] = useState(userConfig?.name);

  const operatorConfigs = useQuery(OperatorConfig);
  const [additionConfig] = operatorConfigs.filtered('$0 == operator', Operator.Addition);
  const [subtractionConfig] = operatorConfigs.filtered('$0 == operator', Operator.Subtraction);
  const [multiplicationConfig] = operatorConfigs.filtered('$0 == operator', Operator.Multiplication);
  const [divisionConfig] = operatorConfigs.filtered('$0 == operator', Operator.Division);

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
    router.back();
  }, [input, realm, userConfig]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textBox} editable onChangeText={(text) => setInput(text)} value={input} />

      <OperatorAdditionSettings config={additionConfig} />
      <OperatorSubtractionSettings config={subtractionConfig} />
      <OperatorMultiplicationSettings config={multiplicationConfig} />
      <OperatorDivisionSettings config={divisionConfig} />

      <SubmitButton onPress={saveName}>Save</SubmitButton>
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
