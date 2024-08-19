import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function DonorRegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = () => {
    // Handle donor registration logic here
    console.log('Donor registered:', { name, email, bloodType, phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Enter your name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Enter your email" />

      <Text style={styles.label}>Blood Type</Text>
      <Picker
        selectedValue={bloodType}
        onValueChange={(itemValue) => setBloodType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select your blood type" value="  " />
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
      </Picker>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} onChangeText={setPhoneNumber} value={phoneNumber} placeholder="Enter your phone number" />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});
