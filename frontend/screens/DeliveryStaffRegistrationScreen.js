import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function DeliveryStaffRegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleRegister = () => {
    // Handle delivery staff registration logic here
    console.log('Delivery staff registered:', { name, email, licenseNumber, vehicleType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Enter your name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Enter your email" />

      <Text style={styles.label}>License Number</Text>
      <TextInput style={styles.input} onChangeText={setLicenseNumber} value={licenseNumber} placeholder="Enter your license number" />

      <Text style={styles.label}>Vehicle Type</Text>
      <TextInput style={styles.input} onChangeText={setVehicleType} value={vehicleType} placeholder="Enter your vehicle type" />

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
});
