import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut } from 'firebase/auth';
import { ref, getDatabase, onValue, update } from 'firebase/database';

export default function FineFoodScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const auth = getAuth();
  const db = getDatabase();

  const renderFineFood = () => {
    const [data, setData] = useState([]);
    useEffect (() => {
      let records = [];
      const FineFoodRef = ref(db, 'Fine Foods');
      onValue(FineFoodRef, (snapshot) => {
        snapshot.forEach(childSnapshot => {
          let newRating = '';
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          const deliveryTime = childData.delivery_time;
          const rate = childData.rating;
          const noOfRatings = childData.number_of_ratings;
          records.push(
            <View style={styles.shopReviewContainer}>
              <View style={styles.shopContainer}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{childKey}</Text>
                <Text style={{fontSize: 15}}>{"Queue Time: " + deliveryTime + " mins"}</Text>
                <Text style={{fontSize: 15}}>{(Math.ceil(rate * 100))/100 + " stars"}</Text>
                <Text style={{fontSize: 15}}>{noOfRatings + " ratings"}</Text>
              </View>
              <View style={{justifyContent: 'center', alignContent: 'center'}}>
                <TextInput 
                  style={styles.ratingContainer} 
                  placeholder = 'Out of 5'
                  onChangeText={(number) => { newRating = number }}/>
                <Pressable
                  style={styles.reviewButton}
                  onPress={() => {
                    if (newRating === "") {
                      alert("Field is Empty")
                    } else if (newRating % 1 != 0) {
                      alert("Please put in a valid Number")
                    } else if (newRating < 0 || newRating > 5) {
                      alert("Please put in a Number between 0 - 5")
                    } else {
                      let aveRatings = ((rate * noOfRatings) + parseInt(newRating)) / (noOfRatings + 1);
                      update(ref(db, 'Fine Foods/' + childKey), {number_of_ratings: noOfRatings + 1, rating: aveRatings});
                      alert("Thanks for Rating");
                      navigation.navigate('Home');
                    }
                  }}
                  >
                  <Text style={styles.reviewText}>Rate</Text>
                </Pressable>
              </View>
            </View>
          );
        })
        setData(records);
      });
    },[])
    return data;
  }

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
            {renderFineFood()}
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
    flex: 0.125,
    flexDirection: 'row',
    backgroundColor:'#007D96', 
    width: '100%',
    justifyContent:'space-between',
    alignItems:'baseline',
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
    backgroundColor: '#005b96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signOutText: {
    fontSize: 15,
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
    width: 175,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  shopContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButton: {
    height: 40,
    width: 50,
    backgroundColor: '#005b96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  reviewText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  shopReviewContainer: {
    height: 100,
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
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
  ratingContainer: {
    height: 40,
    width: 60,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
}); 