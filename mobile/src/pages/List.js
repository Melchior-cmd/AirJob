import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.108:3333', {
        query: { user_id },
      });
      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialCommunityIcons
          name="logout-variant"
          size={25}
          color="#f05a5b"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});
