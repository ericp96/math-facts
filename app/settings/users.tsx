import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import { useRealm } from "@realm/react";
import { BSON } from "realm";
import { router } from "expo-router";
import { Button, FAB, IconButton, MD3Colors, Portal, Dialog } from "react-native-paper";

import { Text, View } from "../../components/library/Themed";
import { useCurrentUser, useGetUsers, useUpdateCurrentUser } from "../../hooks/useCurrentUser";
import { UserConfig } from "../../models/UserConfigModel";
import { Operator } from "../../constants/Enum";
import { OperatorDefaults } from "../../constants/ConfigDefaults";
import Label from "../../components/settings/components/Label";

type UserItemProps = {
  user: UserConfig;
  onEdit: (user: UserConfig) => void;
  onDelete: (user: UserConfig) => void;
  onSelect: (userId: Realm.BSON.ObjectId) => void;
  isCurrentUser: boolean;
};

const UserItem = ({ user, onEdit, onDelete, onSelect, isCurrentUser }: UserItemProps) => (
  <View style={styles.userItem}>
    <View style={styles.userInfo}>
      <Label>{user.name}</Label>
      {isCurrentUser && (
        <Text style={styles.currentUserText}>(Current)</Text>
      )}
    </View>
    <View style={styles.userActions}>
      <IconButton
        icon="account-switch"
        onPress={() => onSelect(user._id)}
        disabled={isCurrentUser}
      />
      <IconButton icon="pencil" onPress={() => onEdit(user)} />
      <IconButton
        icon="delete"
        onPress={() => onDelete(user)}
        disabled={isCurrentUser}
      />
    </View>
  </View>
);

export default function UsersScreen() {
  const realm = useRealm();
  const users = useGetUsers();
  const currentUser = useCurrentUser();
  const updateCurrentUser = useUpdateCurrentUser();
  const [editingUser, setEditingUser] = useState<UserConfig | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserConfig | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleCreateUser = useCallback(() => {
    if (!newUserName.trim()) return;

    const newUserId = new BSON.ObjectId();
    
    realm.write(() => {
      // Create the user config
      realm.create('UserConfig', {
        _id: newUserId,
        name: newUserName.trim(),
        examTime: 60,
        showTimer: true,
      });

      // Create default operator configs for all operators
      Object.values(Operator).forEach((operator) => {
        realm.create("OperatorConfig", {
          _id: new BSON.ObjectId(),
          enabled: true,
          config: OperatorDefaults[operator],
          operator,
          userId: newUserId,
        });
      });
    });
    
    setIsAddModalVisible(false);
    setNewUserName("");
  }, [newUserName, realm]);

  const handleUpdateUser = useCallback((user: UserConfig, newName: string) => {
    realm.write(() => {
      user.name = newName.trim();
    });
    setEditingUser(null);
  }, [realm]);

  const handleDeleteUser = useCallback((user: UserConfig) => {
    realm.write(() => {
      // Delete associated operator configs
      const operatorConfigs = realm.objects('OperatorConfig').filtered('userId == $0', user._id);
      realm.delete(operatorConfigs);
      
      // Delete the user
      realm.delete(user);
    });
    setUserToDelete(null);
  }, [realm]);

  const handleSwitchUser = useCallback((userId: Realm.BSON.ObjectId) => {
    updateCurrentUser(userId);
    router.push("/");
  }, [updateCurrentUser]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onEdit={setEditingUser}
            onDelete={setUserToDelete}
            onSelect={handleSwitchUser}
            isCurrentUser={currentUser?._id.equals(item._id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Label>No users found</Label>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setIsAddModalVisible(true)}
      />

      {/* Add User Modal */}
      <Portal>
        <Dialog visible={isAddModalVisible} onDismiss={() => setIsAddModalVisible(false)}>
          <Dialog.Title>Add New User</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.input}
              value={newUserName}
              onChangeText={setNewUserName}
              placeholder="Enter user name"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsAddModalVisible(false)}>Cancel</Button>
            <Button onPress={handleCreateUser}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Edit User Modal */}
      <Portal>
        <Dialog visible={!!editingUser} onDismiss={() => setEditingUser(null)}>
          <Dialog.Title>Edit User</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.input}
              value={editingUser?.name}
              onChangeText={(text) => {
                if (editingUser) {
                  realm.write(() => {
                    editingUser.name = text;
                  });
                }
              }}
              placeholder="Enter user name"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditingUser(null)}>Cancel</Button>
            <Button 
              onPress={() => {
                if (editingUser) {
                  handleUpdateUser(editingUser, editingUser.name);
                }
              }}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Delete Confirmation Modal */}
      <Portal>
        <Dialog visible={!!userToDelete} onDismiss={() => setUserToDelete(null)}>
          <Dialog.Title>Delete User</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete {userToDelete?.name}?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setUserToDelete(null)}>Cancel</Button>
            <Button 
              onPress={() => {
                if (userToDelete) {
                  handleDeleteUser(userToDelete);
                }
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sortButton: {
    marginBottom: 16,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: MD3Colors.neutral20,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  currentUserText: {
    marginLeft: 8,
    fontSize: 12,
    color: MD3Colors.primary40,
    fontWeight: "bold",
  },
  userActions: {
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: MD3Colors.neutral20,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
});
