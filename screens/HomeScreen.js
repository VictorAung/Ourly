import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  TextInput
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  state = {
    id: '',
  };

  /*constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }*/

  static navigationOptions = {
    header: null,
  };

  writeToObject = async () => {
    //user sign in:
    const { id } = this.state;
    alert(id);
    let obj = {
      name: 'John',
      logStatus: 'r3aaaaaaaaa',
      hours:'500'
    }
    AsyncStorage.setItem(id, JSON.stringify(obj));

    setInterval(async function() {

      let user = await AsyncStorage.getItem(id);
      let parsedUser = JSON.parse(user);
      parsedUser.hours = +parsedUser.hours + 1;
      user = JSON.stringify(parsedUser);
      AsyncStorage.setItem(id, user);
      alert(parsedUser.hours);
    /*


      */
    }, 3000, id
  )
}

/*  intervalHelper = async (id) => {
      try {
        let user = await AsyncStorage.getItem('9999');
        let parsedUser = JSON.parse(user);
        parsedUser.hours = parsedUser.hours + 1;
        user = JSON.stringify(parsedUser);
        AsyncStorage.setItem(id, user);
      }
      catch(error) {
        alert(error);
      }
    }
*/
  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('9999');
      let parsedUser = JSON.parse(user);
      alert(parsedUser.hours);
    }

    catch(error) {
      alert(error);
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

          </View>

          <View style={styles.getStartedContainer}>
            <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            />

          </View>

          <View style={styles.helpContainer}>
                <Text style={styles.getStartedText}>Welcome!</Text>
                <Text style={styles.getStartedText}>Start tracking your hours by entering your ID.</Text>


          </View>

          <View style={styles.helpContainer}>
          <TextInput
            keyboardType='numeric'
            maxLength={4}
            style={styles.idInput}
            placeholder='0000'
            placeholderTextColor='gray'
            /*onSubmitEditing={alert(this.state.id)}*/
            onChangeText={(id) => this.setState({id})}
            onSubmitEditing={
              this.writeToObject

            }
            value={this.state.id}
            />



            <TouchableOpacity
              onPress={this.displayData}>
              <Text>Display Data</Text>
            </TouchableOpacity>

            </View>
        </ScrollView>



      </View>


    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  idInput: {
    height: 50,
    width: 100,
    textAlign: 'center',
    fontSize: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },

  contentContainer: {
    paddingTop: 30,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },


  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },

});
