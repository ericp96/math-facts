import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { View } from "../components/library/Themed";
import { Problem } from "../constants/Types";
import { useFetchProblem } from "../hooks/useFetchProblem";
import WrongAnswer from "../components/WrongAnswer";
import RightAnswer from "../components/RightAnswer";
import { AnswerState } from "../constants/Enum";
import ProblemQuestion from "../components/exam/ProblemQuestion";

export default function Practice() {
  const fetchProblem = useFetchProblem();
  const firstProblem = useMemo(() => fetchProblem(), []);
  const [problem, setProblem] = useState<Problem>(firstProblem);
  const [answerState, setAnswerState] = useState<AnswerState>(
    AnswerState.Pending
  );

  const onCheck = useCallback(
    (answer: number) => {
      Keyboard.dismiss();
      if (problem.solution === answer) {
        setAnswerState(AnswerState.Right);
        return;
      }
      setAnswerState(AnswerState.Wrong);
    },
    [problem, setProblem, fetchProblem, setAnswerState]
  );

  const resetAnswerState = useCallback(() => {
    setTimeout(() => {
      if (answerState === AnswerState.Right) {
        setProblem(fetchProblem());
      }
      setAnswerState(AnswerState.Pending);
    }, 500);
  }, [answerState, fetchProblem, setProblem, setAnswerState]);

  const rightAnswerComponent = useMemo(() => {
    if (answerState === AnswerState.Right) {
      return (
        <RightAnswer
          style={styles.answerOverlay}
          onAnimationFinish={resetAnswerState}
        />
      );
    }
  }, [answerState]);

  const wrongAnswerComponent = useMemo(() => {
    if (answerState === AnswerState.Wrong) {
      return (
        <WrongAnswer
          style={styles.answerOverlay}
          onAnimationFinish={resetAnswerState}
        />
      );
    }
  }, [answerState]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {rightAnswerComponent}
        {wrongAnswerComponent}

        <ProblemQuestion
          problem={problem}
          onSubmit={onCheck}
          enabled={answerState === AnswerState.Pending}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    alignContent: "center",
    height: "100%",
  },
  answerOverlay: {
    backgroundColor: "#cccccc99",
    flex: 1,
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
