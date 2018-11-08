import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigator } from "react-navigation";
import { Constants } from 'expo';


class FlatListItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id)
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View 
          style={{flex: 1, flexDirection: 'column'}}>
          <Text>{item.key}</Text>
          <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  sectionContainer: {
    padding: 40
  },
  inputText: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 2
  },
});


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Krajono',
  };

  state = {
    items: []
  }

  
  
  componentDidMount() {
    fetch("http://192.168.1.58:7999/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ allProjects { id, name, genre, description } }' }),
    })
    .then(r => r.json())
    .then(data => {
        let projects = data.data.allProjects;
        let items = [];
        projects.forEach((project) => {
          items.push({
            key: project.name,
            id: project.id,
            description: project.description
          })
        })
        
        this.setState({ items });
    });
  }

  _onPressItem = (page, id) => {
    const { navigate } = this.props.navigation;
      navigate('Profile', {id});
    
  }

  render() {
    const { items } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <FlatList
              data={items}
              renderItem={({item, separators}) => (
                <FlatListItem item={item} onPressItem={() => this._onPressItem('Profile', item.id)} />
              )} 
            />
          </View>
          <View style={styles.sectionContainer}>
            <Button color={'purple'} title="Crear un proyecto"  />
          </View>
        </View>
      </ScrollView>

    );
  }
}

