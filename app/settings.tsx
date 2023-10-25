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
import Realm, { BSON } from 'realm';

function useSelectOperatorConfig(configs: Realm.Results<OperatorConfig>, operator: Operator) {
  const [config] = configs.filtered('$0 == operator', operator);
  return config;
}

export default function SettingsScreen() {
  const realm = useRealm();
  const [userConfig] = useQuery(UserConfig);
  const [input, setInput] = useState(userConfig?.name);

  const operatorConfigs = useQuery(OperatorConfig);
  const { config: additionConfig, enabled: additionEnabled } =
    useSelectOperatorConfig(operatorConfigs, Operator.Addition) || {};
  const { config: subtractionConfig, enabled: subtractionEnabled } =
    useSelectOperatorConfig(operatorConfigs, Operator.Subtraction) || {};
  const { config: multiplicationConfig, enabled: multiplicationEnabled } =
    useSelectOperatorConfig(operatorConfigs, Operator.Multiplication) || {};
  const { config: divisionConfig, enabled: divisionEnabled } =
    useSelectOperatorConfig(operatorConfigs, Operator.Division) || {};

  const saveName = useCallback(() => {
    if (userConfig != null) {
      realm.write(() => {
        userConfig.name = input;
      });
    } else {
      realm.write(() => {
        realm.create('UserConfig', { _id: new BSON.ObjectID(), name: input });
      });
    }
    router.back();
  }, [input, realm, userConfig]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textBox} editable onChangeText={(text) => setInput(text)} value={input} />

      <OperatorAdditionSettings enabled={additionEnabled} config={additionConfig} />
      <OperatorSubtractionSettings enabled={subtractionEnabled} config={subtractionConfig} />
      <OperatorMultiplicationSettings enabled={multiplicationEnabled} config={multiplicationConfig} />
      <OperatorDivisionSettings enabled={divisionEnabled} config={divisionConfig} />

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
