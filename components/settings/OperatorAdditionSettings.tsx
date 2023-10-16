import { StyleSheet, Switch, Text } from 'react-native';
import { View } from '../library/Themed';
import { useState } from 'react';
import OperatorSettingsWrapper from './OperatorSettingsWrapper';

export default function OperatorAdditionSettings() {
  const [isEnabled, setEnabled] = useState(false);
  return (
    <OperatorSettingsWrapper title="Addition">
      <View style={styles.toggleWrapper}>
        <Text style={styles.label}>Enabled</Text>
        <Switch onValueChange={() => setEnabled(!isEnabled)} value={isEnabled} />
      </View>
    </OperatorSettingsWrapper>
  );
}

const styles = StyleSheet.create({
  toggleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
});
