import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from '../../library/Themed';
import { useCallback } from 'react';
import Colors from '../../../constants/Colors';


export default function SegmentedControl({ isRange, onChange }: {
    isRange: boolean,
    onChange: (isRange: boolean) => void,
  }) {
    const onChangeTrue = useCallback(() => onChange(true), [onChange])
    const onChangeFalse = useCallback(() => onChange(false), [onChange])
    return (
        <View style={[styles.segmentedControlWrapper]}>
          <Pressable 
            style={[
              styles.segmentedControl,
              styles.firstElement,
              isRange ? styles.segmentedControlHighlight : undefined]}
              onPress={onChangeTrue}>
            <Text style={[
              styles.segmentedControlText,
              isRange ? styles.segmentedContorlHighlightText : undefined
            ]}>Range</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.segmentedControl,
              styles.lastElement,
              !isRange ? styles.segmentedControlHighlight : undefined]}
              onPress={onChangeFalse}>
            <Text style={[
              styles.segmentedControlText,
              !isRange ? styles.segmentedContorlHighlightText : undefined
            ]}>List</Text>
          </Pressable>
        </View>
    );
  }

  const borderRadius = 5;

const styles = StyleSheet.create({
    segmentedControlWrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    segmentedControl: {
      backgroundColor: Colors.light.tabIconDefault,
      padding: 10,
      flexGrow: 1,
      justifyContent: 'center'
    },
    segmentedControlText: {
      textAlign: 'center',
    },
    segmentedControlHighlight: {
      backgroundColor: Colors.light.tabIconSelected,
    },
    segmentedContorlHighlightText: {
      color: '#fff',
    },
    firstElement: {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    },
    lastElement: {
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    }
  });