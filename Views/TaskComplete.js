
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TaskBox from '../Componets/TaskBox';

export default function TaskComplete({ tasks, updateStatus }) {
  const insets = useSafeAreaInsets();

  const tasksToShow = tasks.filter(task => task.status === true);

  return (
    <View style={{paddingBottom: insets.bottom}}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas Completadas</Text>
      </View>
      <TaskBox tasks={tasksToShow} updateStatus={updateStatus}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    height: 100,
    padding: 10
  },

  title: {
    fontSize: 30,
  },
  img: {
    width: 40,
    height: 40,
    marginLeft: 20
  }
});
