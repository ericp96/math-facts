import { StyleSheet } from 'react-native';

import { View } from '../../components/library/Themed';
import OperatorSettings from '../../components/settings/OperatorSettings';
import { Operator } from '../../constants/Enum';
import { MonoTitle } from '../../components/library/StyledText';

export default function SettingsAdditionScreen() {
  return (
    <View style={styles.container}>
      <MonoTitle>Addition Settings</MonoTitle>
      <OperatorSettings operator={Operator.Addition} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
