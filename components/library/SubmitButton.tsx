import { StyleSheet, Pressable, Text, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  children: any;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function SubmitButton({ onPress, disabled, children, buttonStyle, textStyle }: Props) {
  return (
    <Pressable style={[styles.submitButton, buttonStyle]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.submitButtonText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#855797',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
