import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BrandsScreen from './screens/BrandsScreen';
import ComponentsListScreen from './screens/ComponentsListScreen';
import ComponentDetailScreen from './screens/ComponentDetailScreen';

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