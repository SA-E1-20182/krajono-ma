import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Pantalla de proyecto',
  };

  state = {
    project: {},
    cover: 'loading'
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    console.log(this.props.navigation.state.params);
    console.log('id', id);

    fetch("http://192.168.1.58:7999/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{ projectByCode(code: ${id}) { id, name, cover_url } }` }),
    })
    .then(r => r.json())
    .then(data => {
        const project = data.data.projectByCode;

        this.setState({ project });

        const { cover_url } = project;
        
        fetch("http://192.168.1.58:7999/graphql", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ imageByCode(code: ${cover_url}) }` }),
        })
        .then(r => r.json())
        .then(data => {
            this.setState({ cover: data.data.imageByCode });
        })
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { project, cover } = this.state;
    const uri = cover === "loading" ? 'no-url' : cover;
    console.log("[!] uri", uri);

    return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri}}
        />
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
