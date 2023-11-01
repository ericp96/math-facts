import { StyleSheet, Switch, Text } from 'react-native';
import { View } from '../library/Themed';
import { useCallback, useState } from 'react';
import { OperatorSettingProps } from './types';
import SubmitButton from '../library/SubmitButton';

const Label = ({ children }: { children: string }) => <Text style={styles.label}>{children}</Text>;

export default function OperatorAdditionSettings({
  enabled: initialEnabled,
  config: initialConfig,
  update,
}: OperatorSettingProps) {
  const [enabled, setEnabled] = useState(initialEnabled || false);
  const [config, setConfig] = useState(initialConfig || {});

  const setConfigProperty = useCallback(
    (property: string, value: any) => {
      setConfig({
        ...config,
        [property]: value,
      });
    },
    [config, setConfig]
  );

  return (
    <View>
      <View style={styles.toggleWrapper}>
        <Label>Enabled</Label>
        <Switch onValueChange={() => setEnabled(!enabled)} value={enabled} />
      </View>
      <View style={styles.toggleWrapper}>
        <Label>Regrouping</Label>
        <Switch
          onValueChange={() => setConfigProperty('enableRegrouping', !config.enableRegrouping)}
          value={config.enableRegrouping}
        />
      </View>

      <View style={styles.toggleWrapper}>
        <Label>Advanced</Label>
        <Switch
          onValueChange={() => setConfigProperty('enableAdvanced', !config.enableAdvanced)}
          value={config.enableAdvanced}
        />
      </View>

      <View>
        <SubmitButton onPress={() => update(enabled, config)}>Save Changes</SubmitButton>
      </View>
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
