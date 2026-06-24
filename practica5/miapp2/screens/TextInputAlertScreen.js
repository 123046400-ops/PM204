import { useState } from 'react'; 
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Button, Platform } from 'react-native'; // Importamos (Alert, Button y Platform)

export default function TextInputScreen() { 
const [nombre, setNombre] = useState('');
const [email, setEmail] = useState(''); 
const [pass, setPass] = useState(''); 
const [numero, setNumero] = useState(''); 
const [telefono, setTelefono] = useState('');
const [busqueda, setBusqueda] = useState(''); 
const [comentario, setComentario] = useState('');
const [decimal, setDecimal] = useState(''); 

const campos = [
{ label: 'Nombre', value: nombre },
{ label: 'Email', value: email },
{ label: 'Contraseña', value: pass ? 'Ingresada' : 'No ingresada' },
{ label: 'Edad', value: numero },
];

const mostrarAlerta = (titulo, mensaje, botones) => {
if (Platform.OS === 'web') { // Solo si estamos corriendo en el navegador
window.alert(`${titulo}\n\n${mensaje}`); 
return; 
}
Alert.alert(titulo, mensaje, botones); // En iOS/Android usamos el Alert nativo 
};

// ALERT 1: Alert simple con un solo botón (OK)
const validarNombre = () => { 
if (nombre === '') { 
mostrarAlerta('Campo vacío', 'Por favor escribe tu nombre antes de continuar');
} else { 
mostrarAlerta('Listo', `Hola ${nombre}, tu nombre fue guardado`);
}
};

// ALERT  2: Alert con dos botones (Cancelar / Confirmar)
const confirmarEnvio = () => { 
mostrarAlerta(
'Confirmar envío',
'¿Estás seguro de que quieres enviar el formulario?',
[
{
text: 'Cancelar',
onPress: () => mostrarAlerta('Cancelado', 'No se envió nada'),
style: 'cancel',
},
{
text: 'Confirmar',
onPress: () => mostrarAlerta('Enviado', 'Tu formulario fue enviado con éxito'),
},
]
);
};

// ALERT TIPO 3: Alert de validación con lógica (revisa el email)
const validarEmail = () => { 
if (email === '') { 
mostrarAlerta('Error', 'El campo de email está vacío');
} else if (!email.includes('@')) { //  no tiene arroba, no es válido
mostrarAlerta('Email inválido', 'Tu correo debe contener el símbolo @');
} else { // pasó las validaciones
mostrarAlerta('Email válido', `${email} tiene un formato correcto`);
}
};

return ( 
<ScrollView style={styles.container}> 
<Text style={styles.title}>Ejemplos de TextInput</Text>


<Text style={styles.label}>Nombre</Text>
<TextInput 
value={nombre} 
onChangeText={setNombre}
placeholder="Lupita" 
autoCapitalize="words" 
placeholderTextColor="#aaa" 
style={styles.input} 
/>

<Text style={styles.label}>Email</Text>
<TextInput 
value={email} 
onChangeText={setEmail}
placeholder="Lupita@gmail.com"
keyboardType="email-address" 
autoCapitalize="none" 
placeholderTextColor="#aaa" 
style={styles.input} 
/>

<Text style={styles.label}>Contraseña</Text>
<TextInput 
value={pass} 
onChangeText={setPass} 
placeholder="********" 
secureTextEntry={true} 
maxLength={20} 
placeholderTextColor="#aaa"
style={styles.input} 
/>

<Text style={styles.label}>Edad (solo números)</Text>
<TextInput 
value={numero}
onChangeText={setNumero} 
placeholder="20" 
keyboardType="numeric" // Teclado solo con números
placeholderTextColor="#aaa" 
style={styles.input}
/>

<Text style={styles.label}>Teléfono</Text>
<TextInput 
value={telefono} 
onChangeText={setTelefono} 
placeholder="12-34-56-78-90" 
keyboardType="phone-pad" // Teclado con números y símbolos 
placeholderTextColor="#aaa" 
style={styles.input} 
/>

<Text style={styles.label}>Búsqueda</Text>
<TextInput 
value={busqueda} 
onChangeText={setBusqueda} 
placeholder="Buscar..." 
returnKeyType="search" 
placeholderTextColor="#aaa" 
style={styles.input} 
/>

<Text style={styles.label}>Precio (decimales)</Text>
<TextInput 
value={decimal}
onChangeText={setDecimal} 
placeholder="19.99"
keyboardType="decimal-pad"
placeholderTextColor="#aaa" 
/>

<Text style={styles.label}>Comentario (multiline)</Text>
<TextInput 
value={comentario}
onChangeText={setComentario} 
placeholder="Escribe tu comentario aquí..." 
multiline={true} 
numberOfLines={4} 
textAlignVertical="top" 
placeholderTextColor="#aaa" 
style={[styles.input, styles.multiline]}
/>

<View style={styles.botonesContainer}>
<View style={styles.botonWrapper}>
<Button title="Guardar nombre" onPress={validarNombre} />
</View>
<View style={styles.botonWrapper}>
<Button title="Validar email" onPress={validarEmail} color="#FF9500" />
</View>
<View style={styles.botonWrapper}>
<Button title="Enviar formulario" onPress={confirmarEnvio} color="#34C759" />
</View>
</View>

<View style={styles.resumen}>
<Text style={styles.resumenTitle}>Datos ingresados</Text>
{campos.map((campo) => (
<Text key={campo.label} style={styles.resumenText}>
{campo.label}: {campo.value || 'Sin datos'}
</Text>
))}
</View>
</ScrollView>
); 
} 

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#fafafa', padding: 20 },
title: { fontSize: 22, fontWeight: '600', marginBottom: 20, color: '#222' },
label: { fontSize: 13, color: '#666', marginTop: 12 },
input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, fontSize: 15, marginBottom: 4 },
multiline: { height: 90, textAlignVertical: 'top' },
botonesContainer: { marginTop: 20, gap: 8 }, 
botonWrapper: { marginBottom: 4 }, 
resumen: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#ddd' },
resumenTitle: { fontWeight: '600', marginBottom: 6, color: '#444' },
resumenText: { fontSize: 14, color: '#555' },
});