import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/library/Themed";
import LottieView from "lottie-react-native";
import InlineTitle from "../components/library/InlineTitle";
import React, { useState } from "react";
import { MonoText } from "../components/library/StyledText";
import { router } from "expo-router";
import Button from "../components/library/Button";
import { useCurrentUser, useGetUsers, useUpdateCurrentUser } from "../hooks/useCurrentUser";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Home() {
  const userConfig = useCurrentUser();
  const users = useGetUsers();
  const updateCurrentUser = useUpdateCurrentUser();

  const [showSwitchUser, setShowSwitchUser] = useState(false);

  const switchUserComponent = showSwitchUser ? (
    <View style={styles.switchUserSection}>
      <InlineTitle style={styles.title} lightColor="#855797" darkColor="#855797">
        Switch User
      </InlineTitle>
      <View>
        {users.map((user) => {
          return (
            <TouchableOpacity
              key={user._id.toString()}
              onPress={() => {
                updateCurrentUser(user._id);
                setShowSwitchUser(false);
              }}
            >
              <MonoText lightColor="#000" darkColor="#000">
                {user.name}
              </MonoText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  ) : null;

  return (
    // @ts-expect-error
    <LottieView
      style={styles.container}
      source={require("../assets/images/background-lottie.json")}
      autoPlay
      loop
      resizeMode="cover"
    >
      <View style={styles.userSection}>
        <InlineTitle lightColor="#855797" darkColor="#855797">
          Hi, {userConfig?.name || "Kid"}.
        </InlineTitle>
        {users.length > 1 && (
          <TouchableOpacity onPress={() => setShowSwitchUser(state => !state)} style={styles.switchUserIcon}>
            <FontAwesome name="caret-down" size={24} color="#855797" />
          </TouchableOpacity>
        )}
      </View>
      {switchUserComponent}


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
  userSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  switchUserIcon: {
    marginLeft: 10,
  },
  switchUserSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
