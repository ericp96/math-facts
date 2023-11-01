import { StyleSheet, Switch, Text } from 'react-native';
import { View } from '../library/Themed';
import { useState } from 'react';
import { OperatorSettingProps } from './types';

export default function OperatorDivisionSettings({ enabled, config, update }: OperatorSettingProps) {
  const [isEnabled, setEnabled] = useState(enabled);
  return (
    <View style={styles.toggleWrapper}>
      <Text style={styles.label}>Enabled</Text>
      <Switch onValueChange={() => setEnabled(!isEnabled)} value={isEnabled} />
    </View>
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
