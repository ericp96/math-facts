import { StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '../components/library/Themed';
import LottieView from 'lottie-react-native';
import InlineTitle from '../components/library/InlineTitle';
import React from 'react';
import { MonoText } from '../components/library/StyledText';
import { router } from 'expo-router';
import { useQuery } from '@realm/react';
import { UserConfig } from '../models/UserConfigModel';

export default function Home() {
  const [userConfig] = useQuery(UserConfig) || [];

  return (
    // @ts-expect-error
    <LottieView
      style={styles.container}
      source={require('../assets/images/background-lottie.json')}
      autoPlay
      loop
      resizeMode="cover"
    >
      <InlineTitle lightColor="#855797" darkColor="#855797">
        Hi, {userConfig?.name || 'Kid'}.
      </InlineTitle>

      <MonoText lightColor="#000" darkColor="#000">
        Let's Get Started
      </MonoText>

      <View lightColor="transparent" darkColor="transparent" style={styles.separator} />

      <TouchableOpacity
        onPress={() => {
          router.push('/practice');
        }}
        style={styles.gameButton}
      >
        <MonoText lightColor="#855797" darkColor="#855797">
          Practice
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.gameButton}>
        <MonoText lightColor="#855797" darkColor="#855797">
          Go!
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.linkButton}>
        <MonoText lightColor="#000" darkColor="#000">
          Analytics
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push('/settings');
        }}
        style={styles.linkButton}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Settings
        </MonoText>
      </TouchableOpacity>
    </LottieView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  gameButton: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#855797',
    borderRadius: 10,
    width: '70%',
    backgroundColor: '#b2cdf7',
    alignItems: 'center',
  },
  linkButton: {
    margin: 8,
    alignItems: 'center',
  },
});
