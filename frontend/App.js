import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginPage from './screens/LoginPage';
import DonorLoginPage from './screens/DonorLoginPage'; // Import the Donor Login Page
import DeliveryStaffLoginPage from './screens/DeliveryStaffLoginPage'; // Import the Delivery Staff Login Page
import SignUpPage from './screens/SignUpPage';
import ConfirmationScreen from './screens/ConfirmationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DonorLogin" component={DonorLoginPage} />
        <Stack.Screen name="DeliveryStaffLogin" component={DeliveryStaffLoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
