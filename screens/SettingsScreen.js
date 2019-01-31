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

  import {
    FileSystem
  } from 'expo';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  writeToFile = async () => {
    var keys_string = await AsyncStorage.getItem("keys");
    var ret = "No users found";
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
    alert (ret);
    Clipboard.setString(ret);
  };

  clearStorage = async () => {
      AsyncStorage.clear(alert("Users have been cleared."));
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
        <Button
          onPress={this.writeToFile}
          title="Copy to Clipboard"
          color="#841584"
          accessibilityLabel="Copy to Clipboard"
          />
          <Button
            onPress={this.clearStorage}
            title="Clear Data"
            color="#841584"
            accessibilityLabel="Clear Data"
          />
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
  },

  logoContainer: {
    alignItems: 'center',
    height: 150,
  },
});
