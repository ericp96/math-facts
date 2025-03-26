import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "../library/Themed";
import { Answer, Problem } from "../../constants/Types";
import { useFetchProblem } from "../../hooks/useFetchProblem";
import ProblemQuestion from "./ProblemQuestion";
import { useQuery, useRealm } from "@realm/react";
import { UserConfig } from "../../models/UserConfigModel";

type Milliseconds = number;
type Seconds = number;

function convertToMilliseconds(time: Seconds): Milliseconds {
  return time * 1000;
}

function computeTimeRemaining(startTime: Milliseconds, seconds: Seconds): number {
  const milliseconds = convertToMilliseconds(seconds);
  const endTime = startTime + milliseconds;
  const currentTime = Date.now();
  return Math.max(0, endTime - currentTime);
}

function useTimer(time: Seconds, onComplete: () => void) {
  const startTime = useMemo(() => Date.now(), [time]);
  const [timeRemaining, setTimeRemaining] = useState(computeTimeRemaining(startTime, time));

  useEffect(() => {
    setTimeRemaining(computeTimeRemaining(startTime, time));
  }, [startTime, time])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Number.isNaN(timeRemaining) || timeRemaining === null || timeRemaining === undefined)  {
        return;
      }
      if (Math.max(0, timeRemaining) === 0) {
        onComplete();
      } else {
        setTimeRemaining(() => computeTimeRemaining(startTime, time))
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [onComplete, timeRemaining, setTimeRemaining])

  return Math.floor(timeRemaining / 1000);
}

export default function ExamRunner({ onEnd, time }: {onEnd: (answers: Array<Answer>) => void, time: number}) {
  const fetchProblem = useFetchProblem();
  const firstProblem = useMemo(() => fetchProblem(), []);
  const [problem, setProblem] = useState<Problem>(firstProblem);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [userConfig] = useQuery(UserConfig);

  const handleEnd = useCallback(() => {
    onEnd(answers);
  }, [onEnd, answers])

  const timeRemaining = useTimer(time, handleEnd);

  const onNext = useCallback(
    (answer: number) => {
      const newAnswers = [
        ...answers,
        {problem, answer}
      ]
      setAnswers(newAnswers);
      setProblem(fetchProblem());
    },
    [answers, problem, setAnswers, setProblem, fetchProblem]
  );

  return (
    <View style={styles.container}>
      {userConfig?.showTimer && (
        <View><Text>{timeRemaining}</Text></View>
      )}
      <ProblemQuestion
        problem={problem}
        onSubmit={onNext}
        enabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    alignContent: "center",
    height: "100%",
    backgroundColor: 'transparent',
    width: "100%",
    flex: 0,
  },
});
