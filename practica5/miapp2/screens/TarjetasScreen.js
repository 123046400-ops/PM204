/*Zona1: importaciones componentes y archivos  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image} from 'react-native'; //Agremgamos Image
import {Perfil} from '../components/Perfil';

/* Zona2: Main ---Componetes */
export default function TarjetasScreen() {
  return (
    <View style={styles.container}>
      
      
      <Perfil style={styles.tarjetaVerde} nombre="María Guadalupe Jimenéz Ruiz" carrera="ISC" materia="movil" cuatri="9°"/> 

      {/*<Text>-----------------------------</Text>*/}
      <Perfil style={styles.tarjetaRoja}nombre="María Jimenéz Ruiz" carrera="Sistemas " materia="Programación" cuatri="9°"/>

      <Perfil style={styles.tarjetaVerde} nombre="Guadalupe Jimenéz Ruiz" carrera="ISC" materia="movil" cuatri="9°"/> 


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
    justifyContent: 'space-between',
    flexDirection:'column',/* row para cambiar a fila*/ 
  },
  tarjetaVerde:{
    backgroundColor:'#6BCB77',
  },
  tarjetaRoja:{
   backgroundColor:'#FF6B6B',
  }
});
