import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, List, FlatList, Image } from 'react-native';
import config from '../config';

const ComponentDetailScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const [component, setComponent] = useState()
  
    const { serverURL, awsURL } = config

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
          <>
        <FlatList style={styles}
          data={[
            {
              key: 0,
              label: 'Title', 
              value:component[0].title
            },
            { 
              key: 1,
              label: 'Description', 
              value: component[0].description
            },
            { 
              key: 2,
              label: 'Manufacturing Years', 
              value: `${component[0].year_from} - ${component[0].year_to}`
            },
            {
              key: 3,
              label: 'Group Name',
              value: component[0].group_title
            },
            {
              key: 4,
              label: 'image',
              value: component[0].image_url
            }
          ]}

          renderItem={({ item, index, separators }) => (
  
            <View style={styles.container} key={item.key}>
              {item.key === 4 ? ( 
                  <Image source={{ uri: `${awsURL}${item.value}`}} style={{ height:200, width:200 } } /> )
               : (
                <Text style={styles.text}>{`${item.label}: ${item.value}`}</Text>)
              }
            </View>
          )
          }
        >
        </FlatList>
        </>
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