import { Pressable, Text, StyleSheet, TextInput } from "react-native";
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
  const inputAccessoryViewID = "textboxButtonViewID";
  const [newValue, setNewValue] = useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.textboxWrapper}>
        <View>
          <TextInput
            style={styles.textBox}
            numberOfLines={1}
            maxLength={4}
            editable
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={text => setNewValue(text)}
            value={newValue}
            inputMode="decimal"
          />
        </View>
        <View>
            <Pressable>
                <Text>+</Text>
            </Pressable>
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
    justifyContent: "flex-end",
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    minWidth: 80
  },
});
