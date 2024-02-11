import { StyleSheet, Switch } from "react-native";
import { View } from "../library/Themed";
import { useCallback, useState } from "react";
import { OperatorSettingProps } from "./types";
import SubmitButton from "../library/SubmitButton";
import RangeSelector from "./components/RangeSelector";
import Label from "./components/Label";
import getValueWithDefault from "../../utils/getValueWithDefault";
import { SubtractionDefaults } from "../../constants/ConfigDefaults";

export default function OperatorSubtractionSettings({
  enabled: initialEnabled,
  config: initialConfig,
  update,
}: OperatorSettingProps) {
  const [enabled, setEnabled] = useState(initialEnabled || false);
  const [config, setConfig] = useState(initialConfig || {});

  const setConfigProperty = useCallback(
    (update: any) => {
      setConfig({
        ...SubtractionDefaults,
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
      
      <View style={styles.toggleWrapper}>
        <Label>Borrowing</Label>
        <Switch
          onValueChange={() =>
            setConfigProperty({ enableBorrowing: !config.enableBorrowing })
          }
          value={config.enableBorrowing}
        />
      </View>

      <View style={styles.toggleWrapper}>
        <Label>Negative Answers</Label>
        <Switch
          onValueChange={() =>
            setConfigProperty({ allowNegatives: !config.allowNegatives })
          }
          value={config.allowNegatives}
        />
      </View>

      <View style={styles.rangeWrapper}>
        <Label>Top Number</Label>
        <RangeSelector
          value={{
            min: getValueWithDefault(config.firstNumberMin, 1),
            max: getValueWithDefault(config.firstNumberMax, 10),
          }}
          onChange={({ min, max }: { min: number; max: number }) => {
            setConfigProperty({ firstNumberMin: min, firstNumberMax: max });
          }}
        />
      </View>

      <View style={styles.rangeWrapper}>
        <Label>Bottom Number</Label>
        <RangeSelector
          value={{
            min: getValueWithDefault(config.secondNumberMin, 1),
            max: getValueWithDefault(config.secondNumberMax, 10),
          }}
          onChange={({ min, max }: { min: number; max: number }) => {
            setConfigProperty({ secondNumberMin: min, secondNumberMax: max });
          }}
        />
      </View>

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
