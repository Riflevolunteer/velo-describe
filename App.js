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
      <Stack.Screen name="Brands" component={BrandsScreen} />
      <Stack.Screen name="ComponentsList" component={ComponentsListScreen} />
      <Stack.Screen name="ComponentDetail" component={ComponentDetailScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );

}

const HomeScreen =({ navigation} ) => {

  const [categories, setCategories] = useState()

  useEffect(() => {
    fetch('http://EXPC02YL10KLVCH:3000/categories').then(
      response => response.json()).then(cat => {
        const sortedCategories = cat.sort((a,b) => a.title > b.title && 1 || -1)
        setCategories(sortedCategories)
       }) 
      .catch(err => console.log(err))
  }, [])

  return ( 
  <View style={styles}>
     {
      categories && categories.map(x => 
        <Button key={x.title} title={x.title} onPress={() => navigation.navigate('Brands', {name: x.title, id: x.category_id})}/>
       )
    } 
    </View>
  )
}

const BrandsScreen = ({ route, navigation }) => {
  const { name, id } = route.params;
  const [brands, setBrands] = useState()

  useEffect(() => {
    fetch(`http://EXPC02YL10KLVCH:3000/brandsbycategory?id=${id}`).then(
      response => response.json()).then(brand => {
        const sortedBrands = brand.sort((a,b) => a.title > b.title && 1 || -1)
        setBrands(sortedBrands)
       }) 
      .catch(err => console.log(err))
  }, [])

  return (
    <View>
  <Text>This is the Brands Screen for {name} with id {id}</Text>
  { 
    brands && brands.map(x => 
      <Button key={x.brand_id} title={x.title} onPress={() => navigation.navigate('ComponentsList', {name: x.title, brand_id: x.brand_id, category_id: id})}/>)
  }
  </View>
  )
};

const ComponentsListScreen = ({ route, navigation }) => {
  const { name, brand_id, category_id } = route.params;
  const [components, setComponents] = useState()

  useEffect(() => {
    fetch(`http://EXPC02YL10KLVCH:3000/componentsbybrandcategory?brand_id=${brand_id}&category_id=${category_id}`).then(
      response => response.json()).then(components => {
        const sortedComponents = components.sort((a,b) => a.title > b.title && 1 || -1)
        setComponents(sortedComponents)
       }) 
      .catch(err => console.log(err))
  }, [])

  return (
    <View>
  <Text>This is the Components Screen for {name} with id {brand_id}</Text>
  { 
    components && components.map(x => 
      <Button key={x.component_id} title={x.title} onPress={() => navigation.navigate('ComponentDetail', {name: x.title, id: x.component_id})}/>)
  }
  </View>
  )
};

const ComponentDetailScreen = ({ route, navigation }) => {
  const { name, id } = route.params;
  const [component, setComponent] = useState()

  useEffect(() => {
    fetch(`http://EXPC02YL10KLVCH:3000/componentdetail?id=${id}`).then(
      response => response.json()).then(component => {
        setComponent(component)
       }) 
      .catch(err => console.log(err))
  }, [])

  return (
    <View>
      { component && component[0] &&
  <Text>This is the Components Screen for {component[0].title} with id {component[0].component_id} from year {component[0].year_from}</Text>
      }
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
