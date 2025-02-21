import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/library/Themed";
import { useCallback, useState } from "react";
import { useQuery, useRealm } from "@realm/react";
import { UserConfig } from "../../models/UserConfigModel";
import { router } from "expo-router";
import SubmitButton from "../../components/library/SubmitButton";
import { BSON } from "realm";

export default function ProfileSettingsScreen() {
  const realm = useRealm();
  const [userConfig] = useQuery(UserConfig);
  const [input, setInput] = useState(userConfig?.name);

  const saveName = useCallback(() => {
    if (userConfig != null) {
      realm.write(() => {
        userConfig.name = input;
      });
    } else {
      realm.write(() => {
        realm.create("UserConfig", {
          _id: new BSON.ObjectID(),
          name: input,
          examTime: 60
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

      <SubmitButton onPress={saveName}>Update Profile</SubmitButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
