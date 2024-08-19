import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function LoginPage({ route, navigation }) {
  const { role } = route.params;

  const navigateToLoginPage = () => {
    if (role === 'donor') {
      navigation.navigate('DonorLoginPage');
    } else if (role === 'delivery_staff') {
      navigation.navigate('DeliveryStaffLoginPage');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login as Donor" onPress={() => navigateToLoginPage('donor')} />
      <Button title="Login as Delivery Staff" onPress={() => navigateToLoginPage('delivery_staff')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
