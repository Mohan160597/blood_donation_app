import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Registered Successfully!</Text>
      <Button
        title={`Login as ${role === 'donor' ? 'Donor' : 'Delivery Staff'}`}
        onPress={() => navigation.navigate('Login', { role })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 24,
    marginBottom: 20,
    color: 'green'
  },
});

export default ConfirmationScreen;
