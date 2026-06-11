/* Reapaso de componentes */
/* perfil usando props */
/*import { View, Text, Button } from "react-native";

export const Perfil = (props) => {
    return (
    <View>
        <Button title= "Mi Perfil" color="rgb(250, 136, 189)"></Button>
        <View>
            <Text>{props.nombre}</Text> 
            <Text>{props.carrera}</Text>
            <Text>{props.materia}</Text>
            <Text>{props.cuatri}</Text>
        </View>
     </View>   
    );
}*/

/* Perfil usuaruio Destructurado */
import { View, Text, Button,StyleSheet } from "react-native";
import React,{useState} from 'react';

export const Perfil = ({nombre,carrera,materia,cuatri,style}) => {
    const [mostrar,setMostrar]=useState(false)

    return (
    
        <View style={[styles.tarjeta,style]}>

            <Text style={styles.nombre}>{nombre}</Text> 

            {mostrar &&                /*renderisado condicional del lado izq se muestra y edl lado derecho se ocualta*/
            <>
            <Text style={styles.carrera}>{carrera}</Text>
            <Text style={styles.otroTexto}>{materia}</Text>
            <Text style={styles.otroTexto}>{cuatri}</Text>
            </>                   /* <></> fragmento es mejor utilizar un fragmento que una vista dentro de otra vista */
            }
            <Button title="Ver Perfil"  onPress={()=>setMostrar(!mostrar)}/>

        </View>
       
    );
}

const styles= StyleSheet.create({
    nombre:{
    fontSize:24,
    fontWeight: 600,/*negritas*/
    textTransform:'uppercase', /*mayusculas*/
},
tarjeta:{
    borderWidth: 2, /*grosor del borde*/
    padding:15,    /*contorno interno*/
    margin:10,    /*controno externo*/
},
carrera:{
    fontSize:18,
    color:'orange',
    fontFamily:'Roboto',/*tipo de letra*/
},
otroTexto:{
    fontSize:12,
    fontFamily:'Roboto',
    fontStyle:'italic',/*cursiva*/
},


}); /*pra8*/