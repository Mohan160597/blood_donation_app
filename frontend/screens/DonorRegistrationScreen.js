import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
//import bcrypt from 'bcryptjs'; // Import bcryptjs for password encryption
import { Ionicons } from '@expo/vector-icons'; // For the eye icon
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import KeyboardAwareScrollView

// Define blood types options
const bloodTypes = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bloodType: yup.string().required('Blood type is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const DonorRegistrationScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async (values) => {
    try {
      const response = await axios.post('http://192.168.63.11:8000/api/register/donor/', {
        name: values.name,
        email: values.email,
        blood_type: values.bloodType,
        phone_number: values.phoneNumber,
        password: values.password, // Send plaintext password
      });
  
      if (response.status === 201) {
        navigation.navigate('Confirmation', { role: 'donor' });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { email, phone_number, password } = error.response.data;
  
        if (email) {
          Alert.alert('Registration Error', email);
        }
  
        if (phone_number) {
          Alert.alert('Registration Error', phone_number);
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
      initialValues={{ name: '', email: '', bloodType: '', phoneNumber: '', password: '', confirmPassword: '' }}
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

          <Text style={styles.label}>Blood Type</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => handleChange('bloodType')(value)}
            onBlur={handleBlur('bloodType')}
            value={values.bloodType}
            items={bloodTypes}
            placeholder={{ label: 'Select your blood type', value: '' }}
          />
          {errors.bloodType && touched.bloodType && <Text style={styles.error}>{errors.bloodType}</Text>}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && touched.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

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
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    // Removed flex: 1
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
    marginBottom: 16,
  },
  eyeIcon: {
    marginLeft: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  inputAndroid: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});

export default DonorRegistrationScreen;
