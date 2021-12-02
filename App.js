import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import BrandsScreen from './Screens/BrandsScreen';
import ComponentsListScreen from './Screens/ComponentsListScreen';
import ComponentDetailScreen from './Screens/ComponentDetailScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Brands" component={BrandsScreen} />
      <Stack.Screen name="ComponentsList" component={ComponentsListScreen} />
      <Stack.Screen name="ComponentDetail" component={ComponentDetailScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );

}