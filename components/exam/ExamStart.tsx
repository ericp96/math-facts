import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { View, Text } from "../library/Themed";
import InlineTitle from "../library/InlineTitle";
import SubmitButton from "../library/SubmitButton";

const times = [15, 20, 30, 40, 50, 60, 90, 120];

export default function ExamStart({
  onStart,
  setExamTime,
  examTime,
}: {
  onStart: () => void;
  setExamTime: (examTime: number) => void;
  examTime: number;
}) {
  return (
    <View style={styles.container}>
      <InlineTitle style={styles.title}>Get Ready... Get Set...</InlineTitle>

      <View style={styles.optionWrapper}>
        <Text style={styles.optionLabel}>Time</Text>
        <View style={styles.chipWrapper}>
          {times.map((seconds) => (
            <Chip
              style={styles.chipStyle}
              onPress={() => setExamTime(seconds)}
              selected={examTime === seconds}
              key={seconds}
            >
              {`${seconds}s`}
            </Chip>
          ))}
        </View>
      </View>

      <SubmitButton
        onPress={() => {
          onStart();
        }}
        buttonStyle={styles.buttonStyle}
      >
        Go!
      </SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    display: "flex",
    backgroundColor: "transparent",
    padding: 20,
  },
  title: {
    textAlign: "center",
    width: "100%",
    color: "#855797",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  buttonStyle: {
    width: "100%",
  },
  optionWrapper: {
    backgroundColor: "transparent",
    width: "100%",
    marginBottom: 20,
  },
  optionLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  chipWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
  },
  chipStyle: {
    marginRight: 5,
    marginBottom: 5,
  },
});
