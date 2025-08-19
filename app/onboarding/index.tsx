import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { View } from '../../components/library/Themed';
import InlineTitle from '../../components/library/InlineTitle';
import { MonoText } from '../../components/library/StyledText';
import Button from '../../components/library/Button';
import { router } from 'expo-router';

export default function OnboardingWelcome() {
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
          <InlineTitle style={styles.title} lightColor="#855797" darkColor="#855797">
            Welcome to Math Facts!
          </InlineTitle>
          
          <MonoText style={styles.subtitle} lightColor="#000" darkColor="#000">
            Let's get you set up for math success
          </MonoText>

          <View style={styles.separator} lightColor="transparent" darkColor="transparent" />

          <Button
            onPress={() => {
              router.push('/onboarding/profile');
            }}
          >
            <MonoText lightColor="#855797" darkColor="#855797">
              Get Started
            </MonoText>
          </Button>
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
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});