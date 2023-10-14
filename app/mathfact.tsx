import { StyleSheet, Text } from 'react-native';

import { View } from '../components/library/Themed';
import { useEffect, useState } from 'react';
import { useGetOperatorProblem } from '../hooks/useFetchProblem';
import { Operator } from '../constants/Enum';

const useMathFacts = () => {
  const [problems, setProblems] = useState([]);
  const getAdditionProblem = useGetOperatorProblem(Operator.Addition);

  useEffect(() => {
    setProblems([...new Array(100)].map(() => getAdditionProblem()));
  }, [getAdditionProblem]);

  return problems;
};

export default function MathFacts() {
  const mathFacts = useMathFacts();
  return (
    <View style={styles.container}>
      <Text>Math facts page</Text>
      {mathFacts.map((v, i) => (
        <View key={i}>
          <Text style={styles.problem}>{`${v.numbers[0]} + ${v.numbers[1]}`}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ff0000',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  problem: {
    color: '#ff0000',
  },
});
