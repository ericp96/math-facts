import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { View } from '../../components/library/Themed';
import InlineTitle from '../../components/library/InlineTitle';
import { MonoText } from '../../components/library/StyledText';
import Button from '../../components/library/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { useRealm } from '@realm/react';
import { BSON } from 'realm';
import { Operator } from '../../constants/Enum';
import { OperatorDefaults } from '../../constants/ConfigDefaults';

export default function OnboardingComplete() {
  const { name, showTimer, examTime, enabledOperators } = useLocalSearchParams<{ 
    name: string;
    showTimer: string;
    examTime: string;
    enabledOperators: string;
  }>();
  
  const realm = useRealm();
  const operators = JSON.parse(enabledOperators || '[]') as Operator[];

  const completeOnboarding = () => {
    const userId = new BSON.ObjectID();
    
    realm.write(() => {
      // Create the user config
      realm.create('UserConfig', {
        _id: userId,
        name: name || 'Kid',
        examTime: parseInt(examTime || '60'),
        showTimer: showTimer === 'true',
      });

      // Create operator configs for enabled operators
      operators.forEach((operator) => {
        realm.create('OperatorConfig', {
          _id: new BSON.ObjectID(),
          enabled: true,
          config: OperatorDefaults[operator],
          operator,
          userId,
        });
      });

      // Create disabled configs for disabled operators
      Object.values(Operator).forEach((operator) => {
        if (!operators.includes(operator)) {
          realm.create('OperatorConfig', {
            _id: new BSON.ObjectID(),
            enabled: false,
            config: OperatorDefaults[operator],
            operator,
            userId,
          });
        }
      });

      // Create preference config
      realm.create('PreferenceConfig', {
        _id: new BSON.ObjectID(),
        currentUser: userId,
      });
    });

    // Navigate to home
    router.replace('/');
  };

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
              Step 4 of 4
            </MonoText>
          </View>

          <InlineTitle style={styles.title} lightColor="#855797" darkColor="#855797">
            You're all set!
          </InlineTitle>
          
          <View style={styles.summaryContainer}>
            <MonoText style={styles.summaryTitle} lightColor="#000" darkColor="#000">
              Here's your setup:
            </MonoText>
            
            <View style={styles.summaryItem}>
              <MonoText style={styles.summaryLabel} lightColor="#666" darkColor="#666">
                Name:
              </MonoText>
              <MonoText style={styles.summaryValue} lightColor="#000" darkColor="#000">
                {name}
              </MonoText>
            </View>

            <View style={styles.summaryItem}>
              <MonoText style={styles.summaryLabel} lightColor="#666" darkColor="#666">
                Exam time:
              </MonoText>
              <MonoText style={styles.summaryValue} lightColor="#000" darkColor="#000">
                {examTime} seconds
              </MonoText>
            </View>

            <View style={styles.summaryItem}>
              <MonoText style={styles.summaryLabel} lightColor="#666" darkColor="#666">
                Timer:
              </MonoText>
              <MonoText style={styles.summaryValue} lightColor="#000" darkColor="#000">
                {showTimer === 'true' ? 'Enabled' : 'Disabled'}
              </MonoText>
            </View>

            <View style={styles.summaryItem}>
              <MonoText style={styles.summaryLabel} lightColor="#666" darkColor="#666">
                Enabled operators:
              </MonoText>
              <MonoText style={styles.summaryValue} lightColor="#000" darkColor="#000">
                {operators.length} of 4
              </MonoText>
            </View>
          </View>

          <MonoText style={styles.tip} lightColor="#666" darkColor="#666">
            💡 You can always change these settings from the main menu
          </MonoText>

          <View style={styles.buttonContainer}>
            <Button onPress={completeOnboarding} style={styles.button}>
              <MonoText lightColor="#855797" darkColor="#855797">
                Start Learning!
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
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  progressContainer: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
  },
  progress: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
  },
  summaryContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  tip: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '70%',
  },
});