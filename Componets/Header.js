import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Mis Tareas</Text>
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
    color: '#000000'
  },
  img: {
    width: 40,
    height: 40,
    marginLeft: 20
  }
});
