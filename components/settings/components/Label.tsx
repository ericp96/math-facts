import { StyleSheet, Text } from "react-native";

export default function({ children }: { children: string }) {
    return (
        <Text style={styles.label}>{children}</Text>
    )
}
const styles = StyleSheet.create({
    label: {
      fontWeight: "bold",
    },
  });