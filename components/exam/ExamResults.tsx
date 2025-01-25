import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Answer, Problem } from "../../constants/Types";
import SubmitButton from "../library/SubmitButton";
import { View } from "../library/Themed";
import { MonoTitle } from "../library/StyledText";
import { useMemo } from "react";

const AnswerSection = ({ text, number }: { text: string; number: number }) => {
  return (
    <View style={styles.answerSection}>
      <Text style={styles.answerTitle}>{`${text}:`}</Text>
      <Text style={styles.answerNumber}>{number}</Text>
    </View>
  );
};

export default function ExamRunner({
  results,
  startNewExam,
}: {
  results: Array<Answer>;
  startNewExam: () => void;
}) {
  const correctAnswers = useMemo(
    () => results.filter((v) => v.answer === v.problem.solution).length,
    [results]
  );
  const incorrectAnswers = useMemo(
    () => results.filter((v) => v.answer !== v.problem.solution).length,
    [results]
  );
  const totalAnswers = useMemo(() => results.length, [results]);

  return (
    <View style={styles.container}>
      <MonoTitle style={styles.resultTitle}>Great work!</MonoTitle>

      <View style={styles.answerWrapper}>
        <AnswerSection text="Correct Answers" number={correctAnswers} />

        <AnswerSection text="Incorrect Answers" number={incorrectAnswers} />

        <AnswerSection text="Questions Answered" number={totalAnswers} />
      </View>

      <SubmitButton onPress={startNewExam}>Try Again</SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  answerWrapper: {
    marginBottom: 15,
    backgroundColor: "#ffffff99",
    borderRadius: 5,
  },
  answerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  answerTitle: {
    fontSize: 20,
  },
  answerNumber: {
    fontSize: 20,
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    // No padding right because of Lottieview....
    // paddingHorizontal: 15,
    paddingLeft: 30,
    flex: 1,
  },
  resultTitle: {
    textAlign: "center",
    marginBottom: 15,
  },
});
