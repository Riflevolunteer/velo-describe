import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import BrandsScreen from './screens/BrandsScreen';
import ComponentsListScreen from './screens/ComponentsListScreen';
import ComponentDetailScreen from './screens/ComponentDetailScreen';
import ComponentGroupScreen from './screens/ComponentGroupScreen';
import MarketAppraisalScreen from './screens/MarketAppraisalScreen';
import AboutScreen from './screens/AboutScreen';
import BikesHomeScreen from './screens/BikesHomeScreen';
import BikeBrandsScreen from './screens/BikeBrandsScreen';
import BikesScreen from './screens/BikesScreen';
import BikeDetailScreen from './screens/BikeDetailScreen';
import theme from './theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: theme.colors.background },
  headerTintColor: theme.colors.ink,
  headerShadowVisible: true,
};

const titleFromRoute = ({ route }) => ({ ...headerOptions, title: route.params.name });

const ComponentsStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ ...headerOptions, title: 'Velo Scout', headerShown: false }}/>
    <Stack.Screen name="Categories" component={CategoriesScreen} options={{ ...headerOptions, title: 'Categories' }}/>
    <Stack.Screen name="Brands" component={BrandsScreen} options={titleFromRoute}/>
    <Stack.Screen name="Components" component={ComponentsListScreen} options={titleFromRoute} />
    <Stack.Screen name="Detail" component={ComponentDetailScreen} options={titleFromRoute} />
    <Stack.Screen name="Group" component={ComponentGroupScreen} options={titleFromRoute} />
    <Stack.Screen name="MarketAppraisal" component={MarketAppraisalScreen} options={titleFromRoute} />
  </Stack.Navigator>
);

const BikesStack = () => (
  <Stack.Navigator initialRouteName="BikesHome">
    <Stack.Screen name="BikesHome" component={BikesHomeScreen} options={{ ...headerOptions, title: 'Velo Scout', headerShown: false }}/>
    <Stack.Screen name="BikeBrands" component={BikeBrandsScreen} options={{ ...headerOptions, title: 'Brands' }}/>
    <Stack.Screen name="Bikes" component={BikesScreen} options={titleFromRoute} />
    <Stack.Screen name="BikeDetail" component={BikeDetailScreen} options={titleFromRoute} />
    <Stack.Screen name="Detail" component={ComponentDetailScreen} options={titleFromRoute} />
    <Stack.Screen name="Group" component={ComponentGroupScreen} options={titleFromRoute} />
    <Stack.Screen name="MarketAppraisal" component={MarketAppraisalScreen} options={titleFromRoute} />
  </Stack.Navigator>
);

const TAB_ICONS = {
  BikesTab: ['bicycle', 'bicycle-outline'],
  ComponentsTab: ['cog', 'cog-outline'],
  AboutTab: ['information-circle', 'information-circle-outline'],
};

const tabScreenOptions = ({ route }) => ({
  ...headerOptions,
  tabBarActiveTintColor: theme.colors.accent,
  tabBarInactiveTintColor: theme.colors.gray,
  tabBarActiveBackgroundColor: theme.colors.surface,
  tabBarStyle: { backgroundColor: theme.colors.background, borderTopWidth: 1, borderTopColor: theme.colors.border },
  tabBarItemStyle: { borderRightWidth: 1, borderRightColor: theme.colors.border },
  tabBarLabelStyle: { fontWeight: '600' },
  tabBarIcon: ({ focused, color, size }) => {
    const [filled, outline] = TAB_ICONS[route.name];
    return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
  },
});

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
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="BikesTab" component={BikesStack} options={{ title: 'Bikes', headerShown: false }} />
      <Tab.Screen name="ComponentsTab" component={ComponentsStack} options={{ title: 'Components', headerShown: false }} />
      <Tab.Screen name="AboutTab" component={AboutScreen} options={{ title: 'About' }} />
    </Tab.Navigator>
    </NavigationContainer>
    </>
  );

}
