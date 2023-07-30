import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import FrontierScreen from './screens/Frontier';
import FineFoodScreen from './screens/FineFood';
import FlavorsScreen from './screens/Flavors';
import PGPRScreen from './screens/PGPR';
import TechnoEdgeScreen from './screens/TechnoEdge';
import DeckScreen from './screens/Deck';
import TerraceScreen from './screens/Terrace';
import { firebaseConfig } from './Firebase';
import { initializeApp } from 'firebase/app';


const Stack = createNativeStackNavigator();

export default function App() {
  initializeApp(firebaseConfig);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="Registration" component={RegistrationScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }}/>
        <Stack.Screen name="Frontier" component={FrontierScreen}/>
        <Stack.Screen name="FineFood" component={FineFoodScreen} options={{ title: 'Fine Food' }}/>
        <Stack.Screen name="Flavors" component={FlavorsScreen} options={{ title: 'Flavors @ Utown' }}/>
        <Stack.Screen name="PGPR" component={PGPRScreen}/>
        <Stack.Screen name="TechnoEdge" component={TechnoEdgeScreen} options={{ title: 'Techno Edge' }}/>
        <Stack.Screen name="Deck" component={DeckScreen} options={{ title: 'The Deck' }}/>
        <Stack.Screen name="Terrace" component={TerraceScreen} options={{ title: 'The Terrace' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//npx expo start --tunnel
//npx react-native start
//eas build -p android --profile preview