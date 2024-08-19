import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function DeliveryStaffLoginPage({ route }) {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.63.11:8000/api/login/deliverystaff/', {
        email,
        password
      });

      if (response.status === 200) {
        // Login successful
        Alert.alert('Login Success', 'You are now logged in.');
        navigation.navigate('Home'); // Navigate to home or another page
      }
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login as Delivery Staff</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp', { role })}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  link: {
    color: 'blue',
    marginTop: 20,
  },
});
