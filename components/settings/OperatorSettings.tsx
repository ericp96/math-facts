import { StyleSheet } from 'react-native';

import { View } from '../../components/library/Themed';
import { useMemo } from 'react';
import { useQuery } from '@realm/react';
import OperatorAdditionSettings from './OperatorAdditionSettings';
import OperatorSubtractionSettings from './OperatorSubtractionSettings';
import OperatorMultiplicationSettings from './OperatorMultiplicationSettings';
import OperatorDivisionSettings from './OperatorDivisionSettings';
import { OperatorConfig } from '../../models/OperatorConfigModel';
import { Operator } from '../../constants/Enum';

function getComponent(operator: Operator) {
  switch (operator) {
    case Operator.Addition:
      return OperatorAdditionSettings;
    case Operator.Multiplication:
      return OperatorMultiplicationSettings;
    case Operator.Subtraction:
      return OperatorSubtractionSettings;
    case Operator.Division:
      return OperatorDivisionSettings;
  }
}

export default function OperatorSettings({ operator }: { operator: Operator }) {
  const operatorConfigs = useQuery(OperatorConfig);
  const [row] = operatorConfigs.filtered('$0 == operator', operator) || [];
  const { config, enabled } = row || {};

  const Component = useMemo(() => getComponent(operator), [operator]);

  return (
    <View style={styles.container}>
      <Component enabled={enabled} config={config} />
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
});
