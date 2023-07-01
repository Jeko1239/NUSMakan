import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { firebaseConfig } from './Firebase';
import { initializeApp } from 'firebase/app';


const Stack = createNativeStackNavigator();

export default function App() {
  initializeApp(firebaseConfig);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="LogIn" component={LogInScreen}/>
        <Stack.Screen name="Registration" component={RegistrationScreen}/>
        
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//npx expo start --tunnel
//npx react-native start