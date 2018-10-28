import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class FlatListItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id)
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View 
          style={{flex: 1, flexDirection: 'column'}}>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
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
    projects: ''
  }
  

  // componentWillMount() {
  //   fetch("http://192.168.1.58:7999", {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ query: '{ allProjects { id, name, genre, description } }' }),
  //   })
  //   // .then(r => r.json())
  //   // .then(data => {
  //   //     this.setState({ projects: data.data.allProjects });
  //   // });
  //   .then(r => console.log(r.text()));
  // }

  _onPressItem = (id) => {
    const { navigate } = this.props.navigation;
    navigate('Profile', {id})
  }

  render() {
    return (
      <View>
        <FlatList
          data={[{key: 'item1', name: 'Proyecto 1', date: 'ayer'}, {key: 'item2', name: 'Proyecto 2', date: 'hoy'}]}
          renderItem={({item, separators}) => (
            <FlatListItem item={item} onPressItem={this._onPressItem} />
          )} 
        />
      </View>
    );
  }
}