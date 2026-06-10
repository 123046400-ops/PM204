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
import { View, Text, Button } from "react-native";
import React,{useState} from 'react';

export const Perfil = ({nombre,carrera,materia,cuatri}) => {
    const [mostrar,setMostrar]=useState(false)

    return (
    
        <View>
            <Text>{nombre}</Text> 

            {mostrar &&                /*renderisado condicional del lado izq se muestra y edl lado derecho se ocualta*/
            <>
            <Text>{carrera}</Text>
            <Text>{materia}</Text>
            <Text>{cuatri}</Text>
            </>                   /* <></> fragmento es mejor utilizar un fragmento que una vista dentro de otra vista */
            }
            <Button title="Ver Perfil"  onPress={()=>setMostrar(!mostrar)}/>

        </View>
       
    );
}