import { StyleSheet, TextInput, InputAccessoryView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { View } from "../library/Themed";
import { Problem } from "../../constants/Types";
import { getOperatorSymbol } from "../../utils/problemUtils";
import { MonoText } from "../library/StyledText";
import SubmitButton from "../library/SubmitButton";

export default function ProblemQuestion({
  problem,
  onSubmit,
  enabled,
}: {
  problem: Problem;
  onSubmit: (answer: number) => void;
  enabled: boolean;
}) {
  const inputAccessoryViewID = "textboxButtonViewID";
  const [input, setInput] = useState("");
  const { numbers, operator } = problem;

  // useEffect(() => {
  //   // Reset the input when the problem changes
  //   setInput("");
  // }, [problem]);

  const onCheck = useCallback(
    () => {
      onSubmit(parseInt(input, 10));
      setInput("");
    },
    [onSubmit, input]
  );

  return (
    <View style={styles.container}>
      {numbers.map((num, i) =>
        i !== numbers.length - 1 ? (
          <View key={i} style={styles.numberWrapper}>
            <MonoText style={styles.mathNumber}>{num.toString()}</MonoText>
          </View>
        ) : (
          <View key={i} style={styles.bottomNumberWrapper}>
            <MonoText style={styles.mathNumber}>
              {getOperatorSymbol(operator)}
            </MonoText>
            <MonoText style={styles.mathNumber}>{num.toString()}</MonoText>
          </View>
        )
      )}
      <View style={styles.bar} lightColor="#000" darkColor="#fff" />
      <View style={styles.answerBox}>
        <TextInput
          editable
          numberOfLines={1}
          maxLength={4}
          autoFocus
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={(text) => setInput(text)}
          value={input}
          style={{ padding: 10, fontSize: 30 }}
          inputMode="decimal"
        />
      </View>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.answerButton}>
          <SubmitButton onPress={onCheck} disabled={!enabled}>
            Check ✅
          </SubmitButton>
        </View>
      </InputAccessoryView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    paddingTop: 20,
    alignContent: "center",
    height: "100%",
  },
  bar: {
    height: 5,
    marginBottom: 20,
    width: "80%",
    marginHorizontal: "10%",
  },
  numberWrapper: {
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "70%",
    marginHorizontal: "15%",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  bottomNumberWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginHorizontal: "15%",
    width: "70%",
    justifyContent: "space-between",
  },
  mathNumber: {
    textAlign: "right",
    fontSize: 80,
  },
  answerBox: {
    backgroundColor: "#eee",
    width: "60%",
    padding: 15,
    alignSelf: "center",
  },
  answerButton: {
    paddingHorizontal: 10,
  },
});
