import { StyleSheet, TextInput } from "react-native";
import { View } from "../../library/Themed";
import { RangeSlider } from "@react-native-assets/slider";
import { useCallback, useState } from "react";
import Colors from "../../../constants/Colors";

type Range = {
  min: number;
  max: number;
};

export default function RangeSelector({
  value,
  onChange,
}: {
  value: Range;
  onChange: (value: { min: number; max: number }) => void;
}) {
  const inputAccessoryViewID1 = "textboxButtonViewID1";
  const inputAccessoryViewID2 = "textboxButtonViewID2";
  const [minValue, setMinValue] = useState(value.min);
  const [maxValue, setMaxValue] = useState(value.max);

  const textboxUpdateMinValue = useCallback(
    (newMinStr: string) => {
        const newMin = parseInt(newMinStr, 10);
        if (!Number.isNaN(newMin)) {
            setMinValue(newMin);
            onChange({ ...value, min: newMin });
        }
    },
    [value, setMinValue, minValue]
  );

  const textboxUpdateMaxValue = useCallback(
    (newMaxStr: string) => {
        const newMax = parseInt(newMaxStr, 10);
        setMaxValue(newMax);
        onChange({ ...value, max: newMax });
    },
    [value, setMaxValue, maxValue]
  );

  return (
    <View style={styles.wrapper}>
      <View>
        <RangeSlider
          range={[value.min, value.max]}
          minimumValue={minValue}
          maximumValue={maxValue}
          step={1}
          outboundColor={Colors.light.tabIconDefault}
          inboundColor={Colors.light.tabIconSelected}
          thumbTintColor={Colors.light.tabIconSelected}
          enabled
          trackHeight={10}
          thumbSize={20}
          onValueChange={([min, max]) => onChange({ min, max })}
        />
      </View>
      <View style={styles.textboxWrapper}>
        <View>
          <TextInput
            style={styles.textBox}
            numberOfLines={1}
            maxLength={4}
            editable
            inputAccessoryViewID={inputAccessoryViewID1}
            onChangeText={textboxUpdateMinValue}
            value={value.min.toString()}
            inputMode="decimal"
          />
        </View>
        <View>
          <TextInput
            style={styles.textBox}
            numberOfLines={1}
            maxLength={4}
            editable
            inputAccessoryViewID={inputAccessoryViewID2}
            onChangeText={textboxUpdateMaxValue}
            inputMode="decimal"
            value={value.max.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 10,
  },
  textboxWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    minWidth: 50
  },
});
