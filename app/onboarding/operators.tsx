import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Switch, Card } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { View } from '../../components/library/Themed';
import InlineTitle from '../../components/library/InlineTitle';
import { MonoText } from '../../components/library/StyledText';
import Button from '../../components/library/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { Operator } from '../../constants/Enum';

const operatorDisplayNames = {
  [Operator.Addition]: '➕ Addition',
  [Operator.Subtraction]: '➖ Subtraction', 
  [Operator.Multiplication]: '✖️ Multiplication',
  [Operator.Division]: '➗ Division',
};

const operatorDescriptions = {
  [Operator.Addition]: 'Basic addition problems',
  [Operator.Subtraction]: 'Basic subtraction problems',
  [Operator.Multiplication]: 'Multiplication tables',
  [Operator.Division]: 'Division facts',
};

export default function OnboardingOperators() {
  const { name, showTimer, examTime } = useLocalSearchParams<{ 
    name: string;
    showTimer: string;
    examTime: string;
  }>();
  
  const [enabledOperators, setEnabledOperators] = useState({
    [Operator.Addition]: true,
    [Operator.Subtraction]: true,
    [Operator.Multiplication]: true,
    [Operator.Division]: true,
  });

  const toggleOperator = (operator: Operator) => {
    setEnabledOperators(prev => ({
      ...prev,
      [operator]: !prev[operator]
    }));
  };

  const useRecommended = () => {
    setEnabledOperators({
      [Operator.Addition]: true,
      [Operator.Subtraction]: true,
      [Operator.Multiplication]: true,
      [Operator.Division]: true,
    });
  };

  const handleNext = () => {
    const enabledOps = Object.entries(enabledOperators)
      .filter(([_, enabled]) => enabled)
      .map(([op, _]) => op);
      
    router.push({
      pathname: '/onboarding/complete',
      params: { 
        name,
        showTimer,
        examTime,
        enabledOperators: JSON.stringify(enabledOps)
      }
    });
  };

  const hasEnabledOperators = Object.values(enabledOperators).some(enabled => enabled);

  return (
    // @ts-expect-error
    <LottieView
      style={styles.container}
      source={require('../../assets/images/background-lottie.json')}
      autoPlay
      loop
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <MonoText style={styles.progress} lightColor="#855797" darkColor="#855797">
              Step 3 of 4
            </MonoText>
          </View>

          <InlineTitle style={styles.title} lightColor="#855797" darkColor="#855797">
            Which math operations would you like to practice?
          </InlineTitle>

          <TouchableOpacity onPress={useRecommended} style={styles.recommendedButton}>
            <MonoText style={styles.recommendedText} lightColor="#855797" darkColor="#855797">
              Use recommended settings
            </MonoText>
          </TouchableOpacity>

          <View style={styles.operatorsContainer}>
            {Object.values(Operator).map((operator) => (
              <Card key={operator} style={styles.operatorCard}>
                <TouchableOpacity
                  style={styles.operatorContent}
                  onPress={() => toggleOperator(operator)}
                >
                  <View style={styles.operatorInfo}>
                    <MonoText style={styles.operatorTitle} lightColor="#000" darkColor="#000">
                      {operatorDisplayNames[operator]}
                    </MonoText>
                    <MonoText style={styles.operatorDescription} lightColor="#666" darkColor="#666">
                      {operatorDescriptions[operator]}
                    </MonoText>
                  </View>
                  <Switch
                    value={enabledOperators[operator]}
                    onValueChange={() => toggleOperator(operator)}
                    color="#855797"
                  />
                </TouchableOpacity>
              </Card>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button 
              onPress={handleNext} 
              style={[styles.button, !hasEnabledOperators && styles.buttonDisabled]}
            >
              <MonoText lightColor="#855797" darkColor="#855797">
                Next
              </MonoText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </LottieView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginTop: 60,
    marginBottom: 20,
  },
  progress: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  recommendedButton: {
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  recommendedText: {
    fontSize: 14,
    fontWeight: '500',
  },
  operatorsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  operatorCard: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  operatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  operatorInfo: {
    flex: 1,
  },
  operatorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  operatorDescription: {
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '70%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});