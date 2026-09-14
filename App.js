import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BrandsScreen from './screens/BrandsScreen';
import ComponentsListScreen from './screens/ComponentsListScreen';
import ComponentDetailScreen from './screens/ComponentDetailScreen';
import MarketAppraisalScreen from './screens/MarketAppraisalScreen';
import theme from './theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: theme.colors.background },
  headerTintColor: theme.colors.ink,
  headerShadowVisible: true,
};

export default function App() {

  return (
    <>
    <StatusBar style="dark" />
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ ...headerOptions, title: 'Velo Scout', headerShown: false }}/>
      <Stack.Screen name="Brands" component={BrandsScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })}/>
      <Stack.Screen name="Components" component={ComponentsListScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
      <Stack.Screen name="Detail" component={ComponentDetailScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
      <Stack.Screen name="MarketAppraisal" component={MarketAppraisalScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
    </Stack.Navigator>
    </NavigationContainer>
    </>
  );

}
