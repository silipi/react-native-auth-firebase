import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from './CustomTextInput';

export default function PasswordInput({ onChangeText, placeholder, width }) {
  const [password, setPassword] = useState(true);
  const [icon, setIcon] = useState("md-eye-off");

  useEffect(() => {
    setIcon(password ? "md-eye-off" : "md-eye")
  }, [password])

  return (
    <View style={{...styles.container, width: width ?? "100%"}}>
      <CustomTextInput
        placeholder={placeholder ?? "Senha"} 
        secureTextEntry={password} 
        onChangeText={e => onChangeText(e)}
        marginVertical={0}
        icon="md-key"
      />
      <Ionicons style={styles.icon} size={26} name={icon} onPress={() => setPassword(!password)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  icon: {
    position: 'absolute',
    top: 13,
    right: 20,
    color: "#576574"
  }
})
