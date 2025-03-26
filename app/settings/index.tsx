import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../../components/library/Themed";
import { useQuery } from "@realm/react";
import { UserConfig } from "../../models/UserConfigModel";
import { router } from "expo-router";
import { MonoText } from "../../components/library/StyledText";

export default function SettingsMenuScreen() {
  const [userConfig] = useQuery(UserConfig);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <MonoText lightColor="#000" darkColor="#000">
          {userConfig?.name}
        </MonoText>
        <MonoText lightColor="#000" darkColor="#000">
          Add Profile
        </MonoText>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/settings/profile");
        }}
        style={styles.button}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Profile
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/settings/addition");
        }}
        style={styles.button}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Addition
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/settings/subtraction");
        }}
        style={styles.button}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Subtraction
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/settings/multiplication");
        }}
        style={styles.button}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Multiplication
        </MonoText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/settings/division");
        }}
        style={styles.button}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Division
        </MonoText>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {
          router.push('/settings/custom');
        }}
        style={styles.button}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Custom
        </MonoText>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          router.push("https://venmo.com/u/Eric-Pastuer");
        }}
        style={styles.linkButton}
      >
        <MonoText lightColor="#000" darkColor="#000">
          Like the app? Send me a tip!
        </MonoText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileSection: {
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 5,
  },
  label: {
    margin: 10,
    marginBottom: 0,
    fontWeight: "bold",
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    margin: 10,
  },
  button: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#855797",
    borderRadius: 10,
    backgroundColor: "#b2cdf7",
    alignItems: "center",
  },
  linkButton: {
    margin: 5,
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
});
