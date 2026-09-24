import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import BrandsScreen from './screens/BrandsScreen';
import ComponentsListScreen from './screens/ComponentsListScreen';
import ComponentDetailScreen from './screens/ComponentDetailScreen';
import ComponentGroupScreen from './screens/ComponentGroupScreen';
import AboutScreen from './screens/AboutScreen';
import MarketAppraisalScreen from './screens/MarketAppraisalScreen';
import theme from './theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: theme.colors.background },
  headerTintColor: theme.colors.ink,
  headerShadowVisible: true,
};

export default function App() {

  useEffect(() => {
    if (__DEV__) return;

    Updates.checkForUpdateAsync()
      .then(({ isAvailable }) => {
        if (!isAvailable) return;
        return Updates.fetchUpdateAsync().then(() => {
          Alert.alert(
            'Update available',
            'A new version of Velo Scout has been downloaded. Restart now to use it?',
            [
              { text: 'Later', style: 'cancel' },
              { text: 'Restart', onPress: () => Updates.reloadAsync() },
            ]
          );
        });
      })
      .catch(() => {});
  }, []);

  return (
    <>
    <StatusBar style="dark" />
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ ...headerOptions, title: 'Velo Scout', headerShown: false }}/>
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ ...headerOptions, title: 'Categories' }}/>
      <Stack.Screen name="Brands" component={BrandsScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })}/>
      <Stack.Screen name="Components" component={ComponentsListScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
      <Stack.Screen name="Detail" component={ComponentDetailScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
      <Stack.Screen name="Group" component={ComponentGroupScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
      <Stack.Screen name="About" component={AboutScreen} options={{ ...headerOptions, title: 'About' }} />
      <Stack.Screen name="MarketAppraisal" component={MarketAppraisalScreen} options={({ route }) => ({ ...headerOptions, title: route.params.name })} />
    </Stack.Navigator>
    </NavigationContainer>
    </>
  );

}
