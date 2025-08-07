import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LottieView from "lottie-react-native";
import ExamStart from "../components/exam/ExamStart";
import ExamRunner from "../components/exam/ExamRunner";
import { useRealm } from "@realm/react";
import { BSON } from "realm";
import { Answer } from "../constants/Types";
import ExamResults from "../components/exam/ExamResults";
import { useCurrentUser } from "../hooks/useCurrentUser";

enum ExamState {
  Setup = "setup",
  Running = "running",
  Results = "results",
}

export default function Exam() {
  const [view, setView] = useState(ExamState.Setup);
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  const realm = useRealm();
  const userConfig = useCurrentUser();

  const setExamTime = useCallback(
    (examTime: number) => {
      if (userConfig != null) {
        realm.write(() => {
          userConfig.examTime = examTime;
        });
      } else {
        realm.write(() => {
          realm.create("UserConfig", {
            _id: new BSON.ObjectID(),
            name: "",
            examTime,
            showTimer: true,
          });
        });
      }
    },
    [realm, userConfig]
  );

  const onExamEnd = useCallback(
    (receivedAnswers: Array<Answer>) => {
      setAnswers(receivedAnswers);
      setView(ExamState.Results);
    },
    [setView, setAnswers]
  );

  return (
    <SafeAreaView style={styles.container}>
      {view === ExamState.Running && (
        <ExamRunner time={userConfig?.examTime} onEnd={onExamEnd} />
      )}

      {view !== ExamState.Running && (
        <View style={styles.background}>
          <LottieView
            style={styles.backgroundAnimation}
            source={require("../assets/images/exam-background.json")}
            autoPlay
            loop
            resizeMode="cover"
          />
          <View style={styles.content}>
            {view === ExamState.Setup && (
              <ExamStart
                onStart={() => setView(ExamState.Running)}
                setExamTime={setExamTime}
                examTime={userConfig?.examTime || 30}
              />
            )}

            {view === ExamState.Results && (
              <ExamResults
                results={answers}
                startNewExam={() => setView(ExamState.Running)}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
});
