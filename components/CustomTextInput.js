import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default function CustomTextInput(props) {
  const { placeholder, width, icon, onChangeText, marginVertical, ...otherProps } = props;

  return (
    <View style={{
      ...styles.container, 
      width: width ?? "100%",
      marginVertical: marginVertical ?? 8,
    }}>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder} 
        onChangeText={e => onChangeText(e)}
        {...otherProps}
      />
      <Ionicons style={styles.icon} name={icon ?? "flask"} size={26}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingRight: 20,
    paddingLeft: 44,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 8,
    color: "#576574"
  }
});
