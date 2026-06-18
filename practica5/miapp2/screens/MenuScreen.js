import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';

export default function MenuScreen() {

  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'tarjetas':
      return <TarjetasScreen />;
    case 'safeAreaScreen':                          
      return <SafeAreaScreen />;
    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Button title='Tarjetas' onPress={() => setScreen('tarjetas')} />
          <Button title='SafeAreaScreen' onPress={() => setScreen('safeAreaScreen')} />
          <Button title='Screen' onPress={() => setScreen('scroll')} />
          <Button title='Pressable' onPress={() => setScreen('pressable')} />
          <StatusBar style="auto" />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  }
});