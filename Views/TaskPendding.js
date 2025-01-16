
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../Componets/Header';
import TaskBox from '../Componets/TaskBox';


export default function TaskPendding({ tasks, updateStatus }) {
  const insets = useSafeAreaInsets();

  const tasksToShow = tasks.filter(task => task.status === false);

  return (
    <View style={{flex: 1}}>
      <Header/>
      <View style={{paddingBottom: insets.bottom, flex: 1, backgroundColor: "f3f3f3"}}>
        <TaskBox tasks={tasksToShow} updateStatus={updateStatus}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    taskContainer: {
    
  
    
    },
    title: {
      
    },
    status: {
      
    },
  });
