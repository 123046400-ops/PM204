/* Reapaso de componentes */
import { View, Text, Button } from "react-native";

export const Perfil = () => {
    return (
    <View>
        <Button title= "Mi Perfil" color="rgb(250, 136, 189)"></Button>
        <View>
            <Text>Nombre: María Guadalupe Jiménez Ruiz</Text>
            <Text>Carrera: Ingeniería en Sistemas Computacionales</Text>
            <Text>Materia: Programación Móvil</Text>
            <Text>Cuatrimestre: 9°</Text>
        </View>
     </View>   
    );
}