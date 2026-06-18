/*Zona1: importaciones componentes y archivos  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image} from 'react-native'; //Agremgamos Image

/* Zona2: Main ---Componetes */
export default function PressableScreen() {
  return (
    <View style={styles.container}>
      
      <Text>Aqui va la practica de PressableScreen view</Text>


      <StatusBar style="auto" />
    </View>
  );
}
/* Zona3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',/* row para cambiar a fila*/ 
  }
});
