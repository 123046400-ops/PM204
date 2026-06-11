/*Zona1: importaciones componentes y archivos  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image} from 'react-native'; //Agremgamos Image
import {Saludo} from './components/Saludo';  //Importamos el componente propio que creamos 
import {Saludo2} from './components/Saludo2';
import {Perfil} from './components/Perfil';//Importamos nuestro componete propio  llamado Perfil
/* Zona2: Main ---Componetes */
export default function App() {
  return (
    <View style={styles.container}>
      
      {/*<Image  source ={require('./assets/wave.png')}/> //Agregamos la imagen a la vista 

      <Text>Hola Mundo RN</Text>
      <Text>-----------------------------</Text>

      <Saludo></Saludo>
      <Saludo/>
      <Text>-----------------------------</Text>

      <Saludo2/>*/}

     {/*} <Text>-----------------------------</Text>*/}
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
    flexDirection:'row',/* row para cambiar a fila*/ 
  },
  tarjetaVerde:{
    backgroundColor:'#6BCB77',
  },
  tarjetaRoja:{
   backgroundColor:'#FF6B6B',
  },
});
