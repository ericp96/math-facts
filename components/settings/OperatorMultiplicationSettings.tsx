import { StyleSheet, Switch, Text } from "react-native";
import { View } from "../library/Themed";
import { useCallback, useState } from "react";
import { OperatorSettingProps } from "./types";
import Label from "./components/Label";
import SubmitButton from "../library/SubmitButton";
import SegmentedControl from "./components/SegmentedControl";
import getValueWithDefault from "../../utils/getValueWithDefault";
import RangeSelector from "./components/RangeSelector";

const listNumbers = [...new Array(12)].map((_, i) => i + 1);

export default function OperatorMultiplicationSettings({
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

      <SegmentedControl
        isRange={config.isRange}
        onChange={(isRange) => setConfigProperty({ isRange })}
      />

      {config.isRange && (
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
      )}

      {config.isRange && (
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
      )}

      {!config.isRange && (
        <>
          {listNumbers.map((v) => (
            <View key={v} style={styles.toggleWrapper}>
              <Label>{`${v}'s`}</Label>
              <Switch
                onValueChange={() => setConfigProperty({[`enable${v}`]: !config[`enable${v}`]})}
                value={config[`enable${v}`]}
              />
            </View>
          ))}
        </>
      )}

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
