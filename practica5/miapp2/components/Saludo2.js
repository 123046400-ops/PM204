
import {Text, Image, Button, View} from "react-native";

/*creamos una funcion*/ 

export const Saludo2 =()=>{  //Agregamos  export
    return(
        <View>
            <Text>Hola RN: Componente Propio</Text>
            <Image  source ={require('../assets/wave.png')}/> /* Agregamos la imagen a la vista */
            <Button title= "Hola 204"></Button>

        </View>
         
    )
}