import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import KeyboardAwareScrollView


const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  licenseNumber: yup.string().required('License number is required'),
  vehicleType: yup.string().required('Vehicle type is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const DeliveryStaffRegistrationScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async (values) => {
    try {
      const response = await axios.post('http://192.168.63.11:8000/api/register/deliverystaff/', {
        name: values.name,
        email: values.email,
        license_number: values.licenseNumber,
        vehicle_type: values.vehicleType,
        password: values.password, // Send plaintext password
      });

      if (response.status === 201) {
        navigation.navigate('Confirmation', { role: 'delivery_staff' });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { email, license_number, password } = error.response.data;

        if (email) {
          Alert.alert('Registration Error', email);
        }

        if (license_number) {
          Alert.alert('Registration Error', license_number);
        }
        /*
        if (password) {
          Alert.alert('Registration Error', password);
        }*/
      } else {
        Alert.alert('Registration Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <KeyboardAwareScrollView
    style={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    <Formik
      initialValues={{ name: '', email: '', licenseNumber: '', vehicleType: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Enter your name"
          />
          {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Enter your email"
          />
          {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>License Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('licenseNumber')}
            onBlur={handleBlur('licenseNumber')}
            value={values.licenseNumber}
            placeholder="Enter your license number"
          />
          {errors.licenseNumber && touched.licenseNumber && <Text style={styles.error}>{errors.licenseNumber}</Text>}

          <Text style={styles.label}>Vehicle Type</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('vehicleType')}
            onBlur={handleBlur('vehicleType')}
            value={values.vehicleType}
            placeholder="Enter your vehicle type"
          />
          {errors.vehicleType && touched.vehicleType && <Text style={styles.error}>{errors.vehicleType}</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} />
            </TouchableOpacity>
          </View>
          {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!confirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={24} />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && touched.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

          <Button title="Register" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DeliveryStaffRegistrationScreen;
