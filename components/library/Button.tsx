import { StyleSheet, TouchableOpacity } from "react-native";

export default function Button({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: any;
  style?: any;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.button]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#855797",
    borderRadius: 10,
    width: "70%",
    backgroundColor: "#b2cdf7",
    alignItems: "center",
  },
});
