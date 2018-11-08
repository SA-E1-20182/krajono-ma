import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Krajono',
  };

  state = {
    items: []
  }
  
  /*componentDidMount() {
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
*/
  _onPressItem = (id) => {
    const { navigate } = this.props.navigation;
    navigate('Profile', {id})
  }

  render() {
    const { items } = this.state;
    return (
      <View>
        <FlatList
          data={items}
          renderItem={({item, separators}) => (
            <FlatListItem item={item} onPressItem={() => this._onPressItem(item.id)} />
          )} 
        />
      </View>
    );
  }
}