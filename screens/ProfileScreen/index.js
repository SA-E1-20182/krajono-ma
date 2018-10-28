import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Pantalla de proyecto',
  // };

  state = {
    project: {}
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    console.log(this.props.navigation.state.params);
    console.log('id', id);

    if(id !== 'NO-ID') {
      fetch("http://192.168.1.58:7999/graphql", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `{ projectByCode(code: ${id}) { id, name } }` }),
      })
      .then(r => r.json())
      .then(data => {
          this.setState({ project: data.data.projectByCode });
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { project } = this.state;

    return (
      <View style={styles.container}>
        <Text>{project.name}</Text>
        <Button
          title="Go to page"
          onPress={() =>
            navigate('Page', { pageId: 1 })
          }
        />
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
