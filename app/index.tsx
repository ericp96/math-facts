import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/library/Themed";
import LottieView from "lottie-react-native";
import InlineTitle from "../components/library/InlineTitle";
import React from "react";
import { MonoText } from "../components/library/StyledText";
import { router } from "expo-router";
import { useQuery } from "@realm/react";
import { UserConfig } from "../models/UserConfigModel";
import Button from "../components/library/Button";

export default function Home() {
  const [userConfig] = useQuery(UserConfig) || [];

  return (
    // @ts-expect-error
    <LottieView
      style={styles.container}
      source={require("../assets/images/background-lottie.json")}
      autoPlay
      loop
      resizeMode="cover"
    >
      <InlineTitle lightColor="#855797" darkColor="#855797">
        Hi, {userConfig?.name || "Kid"}.
      </InlineTitle>

      <MonoText lightColor="#000" darkColor="#000">
        Let's Get Started
      </MonoText>

      <View
        lightColor="transparent"
        darkColor="transparent"
        style={styles.separator}
      />

      <Button
        onPress={() => {
          router.push("/practice");
        }}
      >
        <MonoText lightColor="#855797" darkColor="#855797">
          Practice
        </MonoText>
      </Button>

      <Button
        onPress={() => {
          router.push("/exam");
        }}
      >
        <MonoText lightColor="#855797" darkColor="#855797">
          Go!
        </MonoText>
      </Button>

      {/* <TouchableOpacity onPress={() => {}} style={styles.linkButton}>
        <MonoText lightColor="#000" darkColor="#000">
          Analytics
        </MonoText>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          router.push("/settings");
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
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
  linkButton: {
    margin: 8,
    alignItems: "center",
  },
});
