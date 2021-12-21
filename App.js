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
      <Stack.Screen name="Brands" component={BrandsScreen} options={({ route }) => ({ title: route.params.name })}/>
      <Stack.Screen name="Components" component={ComponentsListScreen} options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="Detail" component={ComponentDetailScreen} options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator>
    </NavigationContainer>
  );

}