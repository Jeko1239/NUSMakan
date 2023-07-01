import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LogInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleLogIn = () => {
    if (email.length === 0) {
      alert("Please Enter Email")
    }
    else if (password.length === 0) {
      alert("Please Enter Password")
    }
    else {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        navigation.navigate('Home');
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
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
          style={styles.logInContainer} 
          value={email} 
          placeholder = 'johnsmith@gmail.com'
          onChangeText={(text) => { setEmail(text) }}/>
        </View>
        <View>  
          <Text style={{ fontSize: 16 }}> Password:</Text>
          <TextInput 
          style={styles.logInContainer} 
          value={password} 
          placeholder = '***********'
          secureTextEntry = {true}
          onChangeText={(text) => { setPassword(text) }}/>
        </View> 
        <Pressable
          style={styles.logInButton}
          onPress={handleLogIn}
        >
          <Text style={styles.logInText}>Log In</Text>
        </Pressable>
        <View 
          style = {{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          >
            <Text style = {{ fontSize:12, lineHeight: 21 }}> Forgotten your login details?</Text>
            <Pressable
              style={styles.forgotButton}
              onPress={() => {
                navigation.navigate('ForgotPassword');}}
            >
              <Text style={styles.forgotText}>Forgot Password.</Text>
            </Pressable>
        </View>
        <View 
          style = {{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 10,
          }}
          >
            <Text style = {{ fontSize:12, lineHeight: 21 }}> Don't have an account?</Text>
            <Pressable
              style={styles.signUpButton}
              onPress={() => {
                navigation.navigate('Registration');}}
            >
              <Text style={styles.signUpText}>Sign up.</Text>
            </Pressable>
        </View>
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
  logInContainer: {
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
  logInButton: {
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
  signUpButton: {
    height: 20,
    width: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#005b96',
    textDecorationLine: 'underline',
  },
  forgotButton: {
    height: 20,
    width: 125,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#005b96',
    textDecorationLine: 'underline',
  }
}); 