import { StyleSheet, TouchableOpacity, Modal, TextInput, Switch } from "react-native";
import { useState } from "react";

import { View } from "../../components/library/Themed";
import { useRealm } from "@realm/react";
import { router } from "expo-router";
import { MonoText } from "../../components/library/StyledText";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { BSON } from 'realm';

export default function SettingsMenuScreen() {
  const userConfig = useCurrentUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const realm = useRealm();

  const handleCreateUser = () => {
    realm.write(() => {
      realm.create('UserConfig', {
        _id: new BSON.ObjectId(),
        name: newUserName,
        examTime: 60,
        showTimer: true,
      });
    });
    setIsModalVisible(false);
    setNewUserName("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <MonoText lightColor="#000" darkColor="#000">
          {userConfig?.name}
        </MonoText>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <MonoText lightColor="#000" darkColor="#000">
            Add Profile
          </MonoText>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MonoText style={styles.modalTitle}>Create New User</MonoText>
            
            <View style={styles.inputContainer}>
              <MonoText>Name</MonoText>
              <TextInput
                style={styles.input}
                value={newUserName}
                onChangeText={setNewUserName}
                placeholder="Enter name"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <MonoText>Cancel</MonoText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={handleCreateUser}
                disabled={!newUserName}
              >
                <MonoText lightColor="#fff" darkColor="#fff">Create</MonoText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '92%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputTitle: {
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#855797',
  },
});
