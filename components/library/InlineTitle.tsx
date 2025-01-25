import { StyleSheet } from 'react-native';

import { Text, TextProps } from './Themed';

interface Props extends TextProps {
  children: any;
}

export default function InlineTitle({ children, style, ...props }: Props) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
