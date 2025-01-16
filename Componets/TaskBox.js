
import { StyleSheet, FlatList, Text, View, Image} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from 'react';



export default function TaskBox({ tasks, updateStatus }) {
  const insets = useSafeAreaInsets();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskContainer}>
          <Checkbox 
          style={styles.checbox}
          value={item.status}
          onValueChange={() => updateStatus(item.id)}
          color={item.status ? 'black':'white'}/>
          <View style={styles.descrip}>
            <Text style={styles.title}>{item.Task}</Text>
          </View>
          
        </View>
      )}
    />
  );
};



const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        borderRadius: 14,
        alignContent: 'center',
        flexDirection: 'row'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    descrip: {
        justifyContent: 'center',
        marginLeft: 10
    },
    checbox: {
      margin: 8,
      borderRadius: 20
    },
    
  });