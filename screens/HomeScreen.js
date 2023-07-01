import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert("Signed Out");
      navigation.navigate('LogIn');
    }).catch(error => {
      alert(error.message);
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style = {{ 
          flex: 1,
          flexDirection: 'row',
          backgroundColor:'cyan', 
          top: 10,
          width: '100%',
          justifyContent:'space-between' }}>
          <Image style={styles.logo} source={require('../assets/NUSMakan!.png')} />
          <View style = {{
            flexDirection: 'column',
            alignItems: 'flex-end',
            top: 5,
            }}>
            <TextInput 
              style={styles.searchContainer} 
              value={search} 
              placeholder = 'Search'
              onChangeText={(text) => { setSearch(text) }}/>
            <Pressable
              style={styles.signOutButton}
              onPress={handleSignOut}
              >
              <Text style={styles.signOutText}>Sign out</Text>
            </Pressable>
          </View>
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
  signOutButton: {
    height: 30,
    width: 100,
    backgroundColor: '#005b96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signOutText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  logo: {
    width: 177.525,
    height: 34.65,
    top: 20,
    left: 10,
  },
  searchContainer: {
    height: 40,
    width: 250,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
}); 