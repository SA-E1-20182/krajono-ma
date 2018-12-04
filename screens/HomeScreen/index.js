import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
  },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
  },
  submitButtonText:{
      color: 'white'
  }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Krajono',
  };

  constructor() {
    super();

    this.state = {
      items: [],
    }

    this.login = this.login.bind(this);
  }

  _onPressItem = (id) => {
    const { navigate } = this.props.navigation;
    navigate('Profile', {id});
  }

  login(id="ruben") {
    const { navigate } = this.props.navigation;
    navigate('ProjectList', {id});
  }

  render() {
    const { items } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style = {styles.container}>
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "  Username"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "  Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                  () => this.login(this.state.email, this.state.password)
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View> 
        </View>
      </ScrollView>
    );
  }
}