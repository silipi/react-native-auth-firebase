import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePostScreen from '../screens/CreatePostScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

export default function HomeStack() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{
        title: "Feed de notícias",
        headerRight: () => (
          <Ionicons name="log-out-outline" size={28} color="#576574" onPress={logout} />
        ),
        headerRightContainerStyle: {paddingRight: 12}
      }} />
      <Stack.Screen name='CreatePost' component={CreatePostScreen} options={{title: "Criar novo post"}} />
    </Stack.Navigator>
  );
}