import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Categories = [
  {
    title: "Bottom Bracket" 
  },
  {
    title: "Brake Levers"  
  },
  { 
    title: "Brake Calipers"
  },
  {
    title: "Chainsets"
  },
  {
    title: "Freewheels"
  },
  {
    title: "Front Deraileurs"
  },
  {
    title: "Gear Levers"
  },
  {
    title: "Handlebars"
  },
  {
    title: "Headsets"
  },
  {
    title: "Hubs"
  },
  {
    title:"Pedals"
  },
  {
    title: "Rear Deraileurs"
  },
  {
    title: "Rims"
  },
  {
    title: "Saddles"
  },
  {
    title: "Seat Posts"
  },
  {
    title: "Stems"
  },
  {
    title: "Tyres"
  }
]

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen =({ navigation} ) => {
  return ( 
  <View style={styles}>
    {
      Categories.map(x => 
        <Button title={x.title} onPress={() => navigation.navigate('Details', {name: x.title})}/>
      )
    }
    </View>
  )
}

const DetailScreen = ({ route, navigation }) => {
  const { name } = route.params;
  return <Text>This is the Detail Screen for {name}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
