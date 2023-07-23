import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut } from 'firebase/auth';
import { ref, getDatabase, onValue, get } from 'firebase/database';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const auth = getAuth();
  const db = getDatabase();

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
        <View style = {styles.header}>
          <Image style={styles.logo} source={require('../assets/NUSMakan!.png')} />
          <View style = {styles.searchSignOut}>
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
        <ScrollView style={styles.scrollViewContainer}> 
          <View style={styles.scrollViewCenter}>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('Frontier');}}
                >
                <Text style={{fontSize: 30}}>Frontier</Text>
            </Pressable>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('PGPR');}}
                >
                <Text style={{fontSize: 30}}>PGPR</Text>
            </Pressable>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('TechnoEdge');}}
                >
                <Text style={{fontSize: 30}}>Techno Edge</Text>
            </Pressable>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('Deck');}}
                >
                <Text style={{fontSize: 30}}>The Deck</Text>
            </Pressable>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('Terrace');}}
                >
                <Text style={{fontSize: 30}}>The Terrace</Text>
            </Pressable>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('FineFood');}}
                >
                <Text style={{fontSize: 30}}>Fine Food</Text>
            </Pressable>
            <Pressable
                style={styles.shopContainer}
                onPress={() => {navigation.navigate('Flavors');}}
                >
                <Text style={{fontSize: 30}}>Flavors @ Utown</Text>
            </Pressable>
          </View>
        </ScrollView>
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
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor:'#007D96', 
    width: '100%',
    justifyContent:'space-between',
  },
  searchSignOut: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    right: 10,
    top: 5,
    gap: 5,
  },
  images: {
    width: 200,
    height: 200,
  },
  signOutButton: {
    height: 30,
    width: 100,
    backgroundColor: '#005b96', //#E36900
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
  shopContainer: {
    height: 100,
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1, 
    backgroundColor:'#ADD8E6', 
    width: '100%',
  },
  scrollViewCenter: {
    alignItems: 'center',
    gap: 10,
  },
}); 