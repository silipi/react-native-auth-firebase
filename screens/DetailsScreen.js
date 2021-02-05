import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { userId, userName } = route.params;

  return (
    <View style={styles.container}>
      <Text>Detalhes do projeto.</Text>
      <Text>UserID: {JSON.stringify(userId)}</Text>
      <Text>UserName: {JSON.stringify(userName)}</Text>

      <Button
        title="Ir para 'Detalhes'... de novo"
        onPress={() =>
          navigation.push('Details', {
            userId: Math.floor(Math.random() * 100),
          })
        }
      />

      <Button title="Ir para 'Página inicial'" onPress={() => navigation.navigate('Home')} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
