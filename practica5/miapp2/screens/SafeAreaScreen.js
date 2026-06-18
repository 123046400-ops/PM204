/* Zona1: Importaciones componentes y archivos*/
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


/* Zona2: Main - Componentes*/
export default function SafeAreaScreen() 
{
  const [mostrarMensaje, setMostrarMensaje] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['top','bottom']}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Mis tareas</Text>
      </View>

      {mostrarMensaje && (
        <View style={styles.mensaje}>
          <Text style={styles.mensajeText}>!Bienvenid@ de nuevo!</Text>
          <TouchableOpacity onPress={() => setMostrarMensaje(false)}>
            <Text style={styles.mensajeCerrar}>x</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView 
      style={styles.scroll}
      contentContainerStyle={styles.listaContenido}
      showsVerticalScrollIndicator={false}>
        {['Comprar Pan', 'Estudiar React Native', 'Aprender Importaciones', 'Llamar a alguien',
        'Revisar un correo', 'Leer un libro', 'Practicar Guitarra', 'Sacar a pasear el perro',
        'Hacer la tarea'].map((tarea, i) =>(
          <View key={i} style={styles.tarjeta}>
            <Text style={styles.tarjetaTexto}>{tarea}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* Zona3: Estilos y Posicionamientos*/
const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor: '#fff'},
  encabezado: {padding: 2, backgroundColor: '#111'},
  titulo: {color: '#fff', fontSize: 22, fontWeight: '700'},
  mensaje: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: '#fff3cd',margin: 16, borderRadius: 8},
  mensajeText: {fontSize: 14, color: '#664d03'},
  mensajeCerrar: {fontSize: 16, fontWeight: '700', color: '#664d03', padding: 6},
  scroll: {flex: 1},
  listaContenido: {padding: 16, paddingBottom: 40},
  tarjeta: {backgroundColor: '#f4f4f4', borderRadius: 10, padding: 16, marginBottom: 10},
  tarjetaTexto: {fontSize: 15, color: '#222'}

});