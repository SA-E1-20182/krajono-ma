import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigator } from "react-navigation";
import { Separator } from "/components/Separator"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    },
    sectionContainer: {
    padding: 40
    },
})

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

export default class ProjectListScreen extends React.Component {
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
            console.log(projects)
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

  render() {
      const { items } = this.state;

      return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.sectionContainer}>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={items}
                            renderItem={({item, separators}) => (
                                <FlatListItem 
                                    item={item} onPressItem={() => this._onPressItem(item.id)}
                                    subtitle={'Rubén es un desarrollador decente'} 
                                    containerStyle={{ borderBottomWidth: 0 }}
                                />
                                <View
                                    style={{
                                    height: 1,
                                    width: "100%",
                                    backgroundColor: "#CED0CE",
                                    marginLeft: "0%"
                                    }}
                                />
                            )} 
                        />
                    </List>
                </View>
            </View>
        </ScrollView>
      );
  }
}