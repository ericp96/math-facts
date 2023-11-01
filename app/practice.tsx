import { StyleSheet, Pressable, Text, TextInput, InputAccessoryView } from 'react-native';
import { useCallback, useMemo, useState } from 'react';
import { View } from '../components/library/Themed';
import { Problem } from '../constants/Types';
import { useFetchProblem } from '../hooks/useFetchProblem';
import { getOperatorSymbol } from '../utils/problemUtils';
import { MonoText } from '../components/library/StyledText';
import WrongAnswer from '../components/WrongAnswer';
import RightAnswer from '../components/RightAnswer';
import SubmitButton from '../components/library/SubmitButton';

enum AnswerState {
  Pending = 'pending',
  Right = 'right',
  Wrong = 'wrong',
}

export default function Practice() {
  const inputAccessoryViewID = 'textboxButtonViewID';

  const fetchProblem = useFetchProblem();

  const [{ numbers, operator, solution }, setProblem] = useState<Problem>(fetchProblem());
  const [input, setInput] = useState('');
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Pending);

  const onCheck = useCallback(() => {
    if (solution === parseInt(input, 10)) {
      setAnswerState(AnswerState.Right);
      return;
    }
    setAnswerState(AnswerState.Wrong);
  }, [solution, input, setInput, setProblem, fetchProblem, setAnswerState]);

  const resetAnswerState = useCallback(() => {
    if (answerState === AnswerState.Right) {
      setInput('');
      setProblem(fetchProblem());
    }
    setAnswerState(AnswerState.Pending);
  }, [answerState, fetchProblem, setInput, setProblem, setAnswerState]);

  const rightAnswerComponent = useMemo(() => {
    if (answerState === AnswerState.Right) {
      return <RightAnswer style={styles.answerOverlay} onAnimationFinish={resetAnswerState} />;
    }
  }, [answerState]);

  const wrongAnswerComponent = useMemo(() => {
    if (answerState === AnswerState.Wrong) {
      return <WrongAnswer style={styles.answerOverlay} onAnimationFinish={resetAnswerState} />;
    }
  }, [answerState]);

  return (
    <View style={styles.container}>
      {rightAnswerComponent}
      {wrongAnswerComponent}

      {numbers.map((num, i) =>
        i !== numbers.length - 1 ? (
          <View key={i} style={styles.numberWrapper}>
            <MonoText style={styles.mathNumber}>{num.toString()}</MonoText>
          </View>
        ) : (
          <View key={i} style={styles.bottomNumberWrapper}>
            <MonoText style={styles.mathNumber}>{getOperatorSymbol(operator)}</MonoText>
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
          <SubmitButton onPress={onCheck} disabled={answerState !== AnswerState.Pending}>
            Check ✅
          </SubmitButton>
        </View>
      </InputAccessoryView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingTop: 20,
    alignContent: 'center',
    height: '100%',
  },
  answerOverlay: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '80%',
  },
  bar: {
    height: 5,
    marginBottom: 20,
    width: '80%',
    marginHorizontal: '10%',
  },
  numberWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '70%',
    marginHorizontal: '15%',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  bottomNumberWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginHorizontal: '15%',
    width: '70%',
    justifyContent: 'space-between',
  },
  mathNumber: {
    textAlign: 'right',
    fontSize: 80,
  },
  answerBox: {
    backgroundColor: '#eee',
    width: '60%',
    padding: 15,
    alignSelf: 'center',
  },
  answerButton: {
    paddingHorizontal: 10,
  },
});
