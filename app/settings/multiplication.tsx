import { StyleSheet } from 'react-native';

import { View } from '../../components/library/Themed';
import OperatorSettings from '../../components/settings/OperatorSettings';
import { Operator } from '../../constants/Enum';

export default function SettingsMultiplicationScreen() {
  return (
    <View style={styles.container}>
      <OperatorSettings operator={Operator.Multiplication} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
