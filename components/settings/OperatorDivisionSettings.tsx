import { StyleSheet, Switch } from "react-native";
import { View } from "../library/Themed";
import { useCallback, useState } from "react";
import { OperatorSettingProps } from "./types";
import Label from "./components/Label";
import SubmitButton from "../library/SubmitButton";

const listNumbers = [...new Array(12)].map((_, i) => i + 1);

export default function OperatorDivisionSettings({
  enabled: initialEnabled,
  config: initialConfig,
  update,
}: OperatorSettingProps) {
  const [enabled, setEnabled] = useState(initialEnabled || false);
  const [config, setConfig] = useState(initialConfig || {});

  const setConfigProperty = useCallback(
    (update: any) => {
      setConfig({
        ...config,
        ...update,
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

          {listNumbers.map((v) => (
            <View key={v} style={styles.toggleWrapper}>
              <Label>{`${v}'s`}</Label>
              <Switch
                onValueChange={() => setConfigProperty({[`enable${v}`]: !config[`enable${v}`]})}
                value={config[`enable${v}`]}
              />
            </View>
          ))}

      <View>
        <SubmitButton onPress={() => update(enabled, config)}>
          Save Changes
        </SubmitButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  rangeWrapper: {
    padding: 10,
  },
  label: {
    fontWeight: "bold",
  },
});
