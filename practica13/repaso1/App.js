/* Zona 1: Importaciones */
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegistroScreen from './screens/RegistroScreen';

/* Zona 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <RegistroScreen />
      <StatusBar style="auto" />
    </View>
  );
}

/* Zona 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});