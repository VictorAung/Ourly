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
  } from 'react-native';

import {
    FileSystem
  } from 'expo';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  writeToFile = async () => {
    const fileContents = 'This is a my content.';
    try {
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'myDirectory/myFile.txt', fileContents);
    }
    catch(error) {
      alert(error);
      fileContents = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'myDirectory/myFile.txt');
      alert("read from file:" + fileContents);
    }
  };

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
          title="Export to .CSV"
          color="#841584"
          accessibilityLabel="Export to .CSV"
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
