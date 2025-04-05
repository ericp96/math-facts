import { Button, StyleSheet, Switch, TextInput } from "react-native";

import { Text, View } from "../../components/library/Themed";
import { useCallback, useState } from "react";
import { useQuery, useRealm } from "@realm/react";
import { UserConfig } from "../../models/UserConfigModel";
import { router } from "expo-router";
import SubmitButton from "../../components/library/SubmitButton";
import { BSON } from "realm";
import Label from "../../components/settings/components/Label";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function ProfileSettingsScreen() {
  const realm = useRealm();
  const userConfig = useCurrentUser();
  const [input, setInput] = useState(userConfig?.name);
  const [showTimer, setShowTimer] = useState(userConfig?.showTimer);

  const saveName = useCallback(() => {
    if (userConfig != null) {
      realm.write(() => {
        userConfig.name = input;
        userConfig.showTimer = showTimer;
      });
    } else {
      realm.write(() => {
        realm.create("UserConfig", {
          _id: new BSON.ObjectID(),
          name: input,
          examTime: 60,
          showTimer
        });
      });
    }
    router.back();
  }, [input, realm, userConfig]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textBox}
        editable
        onChangeText={(text) => setInput(text)}
        value={input}
      />

      <View style={styles.toggleWrapper}>
        <Label>Show Timer</Label>
        <Switch onValueChange={() => setShowTimer(!showTimer)} value={showTimer} />
      </View>

      <SubmitButton onPress={saveName}>Update Profile</SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toggleWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
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
});
