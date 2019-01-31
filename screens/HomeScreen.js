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
import Dialog from 'react-native-dialog';
import { MonoText } from '../components/StyledText';


export default class HomeScreen extends React.Component {
  state = {
    id: '',
    isDialogVisible: false,
    inputText: '',
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


  newUserInput = async() => {
    const { isDialogVisible } = this.state;
    const { inputText } = this.state;
    const { id } = this.state;
    alert(inputText);
    alert("Thanks! You are now signed in.")

    let obj = {
      name: inputText,
      loggedInStatus: 'True',
      hours:'0',
      lastLogin: (new Date()).toString()
      /*intervalID:''*/

    }
    AsyncStorage.setItem(id, JSON.stringify(obj));
    var keys_string = await AsyncStorage.getItem("keys");
    var keys_parsed = [];
    if (keys_string != null){
      keys_parsed = JSON.parse(keys_string);
      //alert("key string is " + keys_string);
    }
    keys_parsed.push(id);
    alert(obj.lastLogin);
    alert("keys: " + keys_parsed.join(","));
    AsyncStorage.setItem("keys", JSON.stringify(keys_parsed));
    this.setState({isDialogVisible: false});
  }


  writeToObject = async () => {
    /*3 possibilities: user signing and doesn't have account, user signing in, user signing out*/
    const { id } = this.state;
    const { isDialogVisible } = this.state;

    try { /*testing to see if user has signed in before */
      let test = await AsyncStorage.getItem(id);
      if (test == null){
        throw "we made it to catch";
      }
    }

    catch(error) { /* if not, initialize account */
      alert(error);
      this.setState({isDialogVisible: true});
      return;
    }

    let user = await AsyncStorage.getItem(id);
    let parsedUser = JSON.parse(user);

    if (parsedUser.loggedInStatus == 'False') { /*if user is logged out */
      parsedUser.loggedInStatus = 'True';
      alert('You are now signed in. Welcome back!')

      parsedUser.lastLogin = new Date();
      // var intervalID = setInterval(async function() {
      //   parsedUser.hours = +parsedUser.hours + 1;
      //   user = JSON.stringify(parsedUser);
      //   AsyncStorage.setItem(id, user);
      //   alert(parsedUser.hours);
      // }, 1000, id
      // )
      // par  sedUser.intervalID = intervalID.toString();


      user = JSON.stringify(parsedUser)
      AsyncStorage.setItem(id, user);
    }

    else { /*if user is logged in */
      parsedUser.loggedInStatus = 'False';
      var now = new Date();
      var parsedDate = new Date(parsedUser.lastLogin)
      alert(parsedDate.getTime());
      var ms = now.getTime() - parsedDate.getTime();
      parsedUser.hours = +parsedUser.hours + (ms/3600000);

      user = JSON.stringify(parsedUser);



      AsyncStorage.setItem(id, user);

      // parsedIntervalID = parseInt(parsedUser.intervalID);
      // clearInterval(parsedIntervalID);


      alert('You have been logged out. Have a great day!');
    }
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
    const { id } = this.state;
    try {
      let user = await AsyncStorage.getItem(id);
      if (user == null){
        throw "Sorry, user not found.";

      }

    }
    catch(error) {
      alert(error);
      return;
    }
    let user = await AsyncStorage.getItem(id);
    alert(user);
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

          </View>

          <View style={styles.logoContainer}>
            <Image
            style={{width: 300, height: 150}}
            source={require ('../assets/images/ourly.png')}
            />

          </View>

          <View style={styles.helpContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.startText}>Start tracking your hours by entering your ID.</Text>


          </View>

          <View style={styles.helpContainer}>
          <TextInput
            keyboardType='numeric'
            maxLength={4}
            style={styles.idInput}
            placeholder='0000'
            placeholderTextColor='gray'
            onChangeText={(id) => this.setState({id})}
            onSubmitEditing={
              this.writeToObject
            }
            value={this.state.id}
            />

            <TouchableOpacity
              onPress={this.writeToObject}>
              <Text>Enter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.displayData}>
              <Text>Display Data</Text>
            </TouchableOpacity>

            <Dialog.Container visible= {this.state.isDialogVisible}>
              <Dialog.Title>We see that you're new around here!</Dialog.Title>
              <Dialog.Description>
                Please go ahead and type in your name so we know who you are. Once we have that, we'll start tracking your hours right away.
              </Dialog.Description>
              <Dialog.Input
                label="Name:"
                onChangeText={(inputText) => this.setState({inputText})}
              ></Dialog.Input>
              <Dialog.Button
                label="Continue"
                onPress= {this.newUserInput} />
            </Dialog.Container>


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
    width: 124,
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

  },

  logoContainer: {
    alignItems: 'center',
    height: 150,
  },


  welcomeText: {
    fontSize: 36,
    lineHeight: 44,
    textAlign: 'center',
  },

  startText: {
    fontSize: 18,
    lineHeight: 44,
    textAlign: 'center',
  },

  helpContainer: {
    marginTop: 15,
    lineHeight: 44,
    alignItems: 'center',

  },

});
