import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Donor"
        onPress={() => navigation.navigate('DonorLogin', { role: 'donor' })}
      />
      <View style={styles.gap} />
      <Button
        title="Delivery Staff"
        onPress={() => navigation.navigate('DeliveryStaffLogin', { role: 'deliveryStaff' })}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gap: {
    height: 30,
  },
  
  button: {
    marginTop: 20,
  },
});
