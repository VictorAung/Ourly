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
  TextInput,
  Button
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

    let obj = {
      name: inputText,
      loggedInStatus: 'False',
      hours:'0',
      lastLogin: (new Date()).toString()
      /*intervalID:''*/

    }
    AsyncStorage.setItem(id, JSON.stringify(obj));
    var keys_string = await AsyncStorage.getItem("keys");
    var keys_parsed = [];
    if (keys_string != null){
      keys_parsed = JSON.parse(keys_string);

    }
    keys_parsed.push(id);

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
      this.setState({isDialogVisible: true});
      return;
    }

    let user = await AsyncStorage.getItem(id);
    let parsedUser = JSON.parse(user);

    if (parsedUser.loggedInStatus == 'False') { /*if user is logged out */
      parsedUser.loggedInStatus = 'True';
      alert('You are now signed in. Welcome back!')

      parsedUser.lastLogin = new Date();



      user = JSON.stringify(parsedUser)
      AsyncStorage.setItem(id, user);
    }

    else { /*if user is logged in */
      parsedUser.loggedInStatus = 'False';
      var now = new Date();
      var parsedDate = new Date(parsedUser.lastLogin)
      var ms = now.getTime() - parsedDate.getTime();
      parsedUser.hours = +parsedUser.hours + (ms/3600000);

      user = JSON.stringify(parsedUser);
      AsyncStorage.setItem(id, user);
      alert('You have been logged out. Have a great day!');
    }
}


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
    var parsed_user = JSON.parse(user);
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
                <Text style={styles.startText}>Sign in or out by entering your ID.</Text>


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

            <View style={styles.contentContainer}>
              <Button
                onPress={this.writeToObject}
                title="Enter"
                color="#270a77"
                accessibilityLabel="Enter"
                />
            </View>
            <View style={styles.contentContainer}>
              <Button
                onPress={this.displayData}
                title="Display Data"
                color="#270a77"
                accessibilityLabel="Display Data"
                />
            </View>



            <Dialog.Container visible= {this.state.isDialogVisible}>
              <Dialog.Title>We see that you're new around here!</Dialog.Title>
              <Dialog.Description>
                Please go ahead and type in your name so we know who you are. Afterwards, enter your ID again to sign in.
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

  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
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
