import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
        <Image style={styles.image}
            source={require('./img/page-example.png')}
        />
    );
  }
}

const styles = StyleSheet.create({
  image: {
      flex: 1,
      alignSelf: 'stretch',
  },
});

        