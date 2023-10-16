import { StyleSheet, Pressable, Text } from 'react-native';
import { View } from '../library/Themed';
import { useState } from 'react';

export default function OperatorSettingsWrapper({ title, children }: { title: string; children: any }) {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable style={styles.headerPressable} onPress={() => setExpanded(!isExpanded)}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.headerText}>{isExpanded ? '⏫️' : '⏬️'}</Text>
      </Pressable>
      {isExpanded && <View style={styles.childContainer}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headerPressable: {
    marginTop: 5,
    backgroundColor: '#b2cdf7',
    padding: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  childContainer: {
    padding: 8,
    borderColor: '#b2cdf7',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
