import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

export default function LogInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const auth = getAuth();

  const handleSignUp = async () => {
    if (email.length === 0) {
      alert("Please Enter Email")
    }
    else if (username.length === 0) {
      alert("Please Enter Username")
    }
    else if (password.length === 0) {
      alert("Please Enter Password")
    }
    else if (confirm.length === 0) {
      alert("Please Confirm Password")
    }
    else if (confirm != password) {
      alert("Confirm Password does not match")
    }
    else {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // const user = userCredentials.user;
        console.log('User Created:', email);
        navigation.navigate('LogIn');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      })
      await updateProfile(auth.currentUser, {
        displayName: username
      }).catch(error => {
        alert(error.message);
      });
      await sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Verfication Email sent");
      });
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require('../assets/NUSMakan!.png')} />
        <View>  
          <Text style={{ fontSize: 16 }}>Email:</Text>
          <TextInput 
          style={styles.logInContainer} 
          value={email} 
          placeholder = 'johnsmith@gmail.com'
          onChangeText={(text) => { setEmail(text) }}/>
        </View>
        <View>  
          <Text style={{ fontSize: 16 }}>Username:</Text>
          <TextInput 
          style={styles.logInContainer} 
          value={username} 
          placeholder = 'JohnSmith123'
          onChangeText={(text) => { setUsername(text) }}/>
        </View>
        <View>  
          <Text style={{ fontSize: 16 }}>Password:</Text>
          <TextInput 
          style={styles.logInContainer} 
          value={password} 
          placeholder = '***********'
          secureTextEntry = {true}
          onChangeText={(text) => { setPassword(text) }}/>
        </View> 
        <View>  
          <Text style={{ fontSize: 16 }}>Confirm Password:</Text>
          <TextInput 
          style={styles.logInContainer} 
          value={confirm} 
          placeholder = '***********'
          secureTextEntry = {true}
          onChangeText={(text) => { setConfirm(text) }}/>
        </View> 
        <Pressable
          style={styles.logInButton}
          onPress={handleSignUp}
        >
          <Text style={styles.logInText}>Sign Up</Text>
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