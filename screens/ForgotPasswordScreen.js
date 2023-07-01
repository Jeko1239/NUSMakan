import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const handleForgotPassword = () => {
    if (email.length === 0) {
      alert("Please Enter Email")
    }
    else {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Reset Password sent: " + email);
        alert("Reset Password Email sent");
        navigation.navigate('LogIn');
      })
      .catch(error => {
        alert(error.message);
      })
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require('../assets/NUSMakan!.png')} />
        <View>  
          <Text style={{ fontSize: 16 }} >Email:</Text>
          <TextInput 
          style={styles.forgotPasswordContainer} 
          value={email} 
          placeholder = 'johnsmith@gmail.com'
          onChangeText={(text) => { setEmail(text) }}/>
        </View>
        <Pressable
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.logInText}>Confirm</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  images: {
    width: 200,
    height: 200,
  },
  forgotPasswordContainer: {
    height: 40,
    width: 250,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  forgotPasswordButton: {
    height: 40,
    width: 200,
    backgroundColor: '#005b96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  logInText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  logo: {
    width: 295.875,
    height: 57.75,
  },
  registrationButton: {
    height: 30,
    width: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#005b96',
    textDecorationLine: 'underline',
  }
}); 