import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


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

  const [categories, setCategories] = useState()

  useEffect(() => {
    fetch('http://EXPC02YL10KLVCH:3000/categories').then(
      response => response.json()).then(cat => {
        setCategories(cat)
        ///console.log(categories)
       }) 
      .catch(err => console.log(err))
  }, [])

  return ( 
  <View style={styles}>
     {
      categories && categories.map(x => 
        <Button key={x.title} title={x.title} onPress={() => navigation.navigate('Details', {name: x.title})}/>
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
