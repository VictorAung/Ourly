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
  Button,
  Clipboard,
  } from 'react-native';

  import Dialog from 'react-native-dialog';

export default class SettingsScreen extends React.Component {
  state = {
    isDialogVisible: false,
  };

  static navigationOptions = {
    header: null,
  };

  viewDialog = () => {
    const { isDialogVisible } = this.state;
    this.setState({isDialogVisible: true});
  };

  handleCancel = () => {
      const { isDialogVisible } = this.state;
      this.setState({isDialogVisible: false});
  };

  writeToFile = async () => {
    var keys_string = await AsyncStorage.getItem("keys");
    var ret = "No users found.";
    if (keys_string != null){
      store_users = [];
      store_users.push('name,id,hours');
      keys_parsed = JSON.parse(keys_string);
      for (let i=0; i<keys_parsed.length; i++){
          var id = keys_parsed[i];
          var user = await AsyncStorage.getItem(id);
          if (user != null){
            var store_info = [];
            var parsed_user = JSON.parse(user);
            store_info.push(parsed_user.name, id,  parsed_user.hours);
            store_users.push(store_info.join(","));
          }
      };
      ret = store_users.join("\n");
    }
    else {
      alert(ret);
      return;
    };
    alert ("All user data has been copied to your clipboard!");
    Clipboard.setString(ret);
  };

  clearStorage = async () => {
      AsyncStorage.clear();
      const { isDialogVisible } = this.state;
      this.setState({isDialogVisible: false});
  }

  render() {
    return(
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
          style={{width: 300, height: 150}}
          source={require ('../assets/images/ourly.png')}
          />
        </View>
        <View style={styles.contentContainer}>
          <Button
            onPress={this.writeToFile}
            title="Copy all Data to Clipboard"
            color="#270a77"
            accessibilityLabel="Copy all Data to Clipboard"
            />
            <Text style={styles.startText}>Press above to copy ALL user data to your clipboard.</Text>
            </View>
        <View style={styles.contentContainer}>
          <Button
            onPress={this.viewDialog}
            title="Clear ALL Data"
            color="#270a77"
            accessibilityLabel="Clear ALL Data"
            />
            <Text style={styles.startText}>Press above to delete ALL user data.</Text>
          </View>

          <Dialog.Container visible= {this.state.isDialogVisible}>
            <Dialog.Title>WARNING!</Dialog.Title>
            <Dialog.Description>
              This will delete ALL data and cannot be reverted. Are you sure you want to continue?
            </Dialog.Description>
            <Dialog.Button label="Cancel"
            onPress={this.handleCancel}
            />
            <Dialog.Button
              label="Continue"
              onPress= {this.clearStorage} />
          </Dialog.Container>

      </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
    marginTop: 30,
    marginBottom: 15,
  },

  startText: {
    fontSize: 18,
    lineHeight: 44,
    textAlign: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    height: 150,
  },
});
