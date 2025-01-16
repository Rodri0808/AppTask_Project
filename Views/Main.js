import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import TaskPendding from "./TaskPendding";
import TaskComplete from './TaskComplete';
import AddTaskModal from "../Componets/AddTaskModal";
import {TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

/*
export function Agregar({isVisible, onClose, onAddTask}) {
  const [TextTasks, setTexTasks] = useState('');
  
    const addTasks = () => {
  
      if (TextTasks.trim() === '') return;
  
      const newTask = {
        id: Date.now().toString(),
        Task: TextTasks,
        status: false
      }
      
      onAddTask(newTask); 
      setTexTasks("");
      onClose();
      
  }

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="fade" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Nueva Tarea</Text>
        </View>

        <TextInput style={styles.modalText} placeholder="Nueva tarea" value={TextTasks} onChangeText={setTexTasks}/>

        <Button title="Guardar" onPress={addTasks}/>
        <Button title="Cancelar" onPress={() => onClose()}/>
      </View>
    </View>
  
</Modal>
  )
}*/

export default function Main() {
  const [isModalAdd, setModalAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Cargar Tareas guardadas
    useEffect(() => {
      const loadTasks = async () => {
        try {
          const savedTasks = await AsyncStorage.getItem('tasks');
          if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
          } else {
            setTasks([]);
          }
        } catch (error) {
          console.log('Error de carga',error);
        }
      };
  
      loadTasks();
    }, [])
  
     // Guardar tarea en AsyncStorage
    const savedTasks = async (newTasks) => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        console.log("Tareas guardadas:", newTasks);
      } catch (error) {
        console.log('Error al guardar tareas', error);
      }
    };

  // Función para agregar tarea
    const addTask = (newTask) => {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      savedTasks(updatedTasks);
    };

    //Funcion actualizar status
    const updateStatus = (taskId) => {
      const updated = tasks.map((index) =>
        index.id === taskId ? { ...index, status: !index.status } : index
      );

      setTasks(updated);
      savedTasks(updated);
    }

    /*
    AsyncStorage.clear().then(() => {
      console.log('Todos los datos de AsyncStorage han sido eliminados');
    });*/

   

  return (
    <NavigationContainer>
      
      <Tab.Navigator
        initialRouteName="Tareas"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopColor: 'trasparent'
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#bbb' 
        }}
      >
        <Tab.Screen name="Tareas" children={() => <TaskPendding tasks={tasks} updateStatus={updateStatus} />} options={{
          tabBarLabel: 'Por Hacer',
          tabBarIcon: ({color, size}) => (
            <Ionicons name='document-text-outline' color={color} size={size}/>
          ) 
        }} />
        <Tab.Screen name="agregar" component={TaskComplete} options={{
          tabBarLabel: ' ',
          tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="add-circle"
            color='#000000'
            size={size * 3.5}
            style={{ position: 'absolute', top: -30, left: -30, right: -30 }}
          />
        ),
        tabBarButton: (props) => (
          <TouchableOpacity {...props} onPress={() => setModalAdd(true)} />
        ),
        tabBarStyle: {
          color: '#000000',
          height: 80, // Asegúrate de que la pestaña sea lo suficientemente grande
        },
      }}
    />
        <Tab.Screen name="Completadas" children={() => <TaskComplete tasks={tasks} updateStatus={updateStatus}/>} options={{
          tabBarLabel: 'Completadas',
          tabBarIcon: ({color, size}) => (
            <Ionicons name='checkmark-circle' color={color} size={size}/>
          )
        }}/>
      </Tab.Navigator>

      <AddTaskModal isVisible={isModalAdd} onClose={() => setModalAdd(false)} onAddTask={addTask}/>
    </NavigationContainer>
  );
};



//ESTILOS

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10, // Sombra en Android
      
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center'
    },
    modalContent: {
      width: 300,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 14,
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      padding: 10
    },

    modalText: {
      fontSize: 18,
      padding: 10,
      backgroundColor: '#f3f3f3',
      borderRadius: 14,
      width: 250,
      height: 50
      }
  });