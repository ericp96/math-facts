import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { MonoText } from './library/StyledText';
import { Text, View } from './library/Themed';
import InlineTitle from './library/InlineTitle';

function navigate() {
  router.replace('/mathfact');
}

export default function SelectUser() {
  return (
    <View style={styles.container}>
      <InlineTitle>Pick Player</InlineTitle>

      <View style={styles.separator} />

      <View style={styles.userList}>
        <TouchableOpacity onPress={navigate} style={styles.user}>
          <MonoText style={styles.addUserText} lightColor="#000" darkColor="#000">
            Matthew
          </MonoText>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigate} style={styles.user}>
          <MonoText style={styles.addUserText} lightColor="#000" darkColor="#000">
            Adalie
          </MonoText>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigate} style={styles.user}>
          <MonoText style={styles.addUserText} lightColor="#000" darkColor="#000">
            + User
          </MonoText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  userList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    flex: 0,
    backgroundColor: 'transparent',
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    font: '#000',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 120,
    width: 120,
    height: 120,
    margin: 15,
  },
  addUserText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
