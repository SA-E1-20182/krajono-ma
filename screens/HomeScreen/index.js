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
      email: '',
      password: ''
    }

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    const { email, password } = this.state;
      const query =  `mutation CreateSession($input: SessionInput!) {
          createSession(auth: $input) {
              jwt
          }
      }`

      fetch(process.env.REACT_APP_API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              query,
              variables: {
                input: {
                    auth: {
                        email, password
                    }
                }
              }
          })
      })
      .then(r => {console.log(r); return r})
      .then(data => {
          console.log(data)
          this.props.dispatch(login(data.data.createSession.jwt));

      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });
  }

  handleEmail(e) {
      const { value } = e;
      this.setState({ email: value });
  }

  handlePassword(e) {
      const { value } = e;
      this.setState({ password: value });
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
                onChangeText = {(this.handleEmail)}/>

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "  Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePassword}/>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                  () => this.login()
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
