import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Pantalla de proyecto',
  };

  render() {
    console.log(this.props.name);
    const { navigate } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <Button
          title="Go to test's profile"
          onPress={() =>
            navigate('Page', { name: 'Jane' })
          }
        />
        <Text>Open up screens/ProfileScreen.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
