import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function MonoTitle(props: TextProps) {
  return <Text {...props} style={[props.style, { fontSize: 24, fontFamily: 'SpaceMono' }]} />;
}
