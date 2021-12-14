import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, List, FlatList } from 'react-native';
import config from '../config';

const ComponentDetailScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const [component, setComponent] = useState()
  
    const { serverURL } = config

    useEffect(() => {
      fetch(`${serverURL}/componentdetail?id=${id}`).then(
        response => response.json()).then(component => {
          setComponent(component)
         }) 
        .catch(err => console.log(err))
    }, [])
  
    return (
      <View style={styles.container}>
        { component && component[0] && (
        <FlatList style={styles}
          data={[
            {
              key: 0,
              label: 'Title', 
              value:component[0].title
            },
            { 
              key: 1,
              label: 'Id', 
              value: component[0].component_id
            },
            { 
              key: 2,
              label: 'Year from', 
              value: component[0].year_from
            }
          ]}

          renderItem={({ item, index, separators }) => (
            <View style={styles} key={item.key}>
              <Text style={styles.text}>{`${item.label}: ${item.value}`}</Text>
            </View>
          )
          }
        >
        </FlatList>
        )
        }
    </View>
    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2194f3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#fff'
    }
  });

  export default ComponentDetailScreen