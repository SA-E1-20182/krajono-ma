import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import { Constants } from 'expo';

const genreOptions = [  // TODO: there ought to be some collection of these somewhere!
  { key: 'action', text: 'Acción', value: 'Acción' },
  { key: 'sol', text: 'Slice of Life', value: 'Slice of Life' },
  { key: 'historical', text: 'Histórico', value: 'Histórico' },
]

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

export default class CreateProjectScreen extends React.Component {
  static navigationOptions = {
    title: 'Crear proyecto',
  };

  componentDidMount() {
    const { navigation } = this.props;
  }

   constructor() {
      super();


      this.state = {
          name: '',
          genre: '',
          description: '',
          cover: null
      }

      this.createProject = this.createProject.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleDropdownChange = this.handleDropdownChange.bind(this);
      this.handleFileChange = this.handleFileChange.bind(this);
  }

  createProject(e) {
      e.preventDefault();
      const { name, genre, description } = this.state;
      const author_id = "author_id";  // TODO:
      const query =  `mutation CreateProject($input: ProjectInput!) {
          createProject(project: $input) {
              id
              name
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
                      name, genre, description, author_id
                  }
              }
          })
      })
      .then(r => {console.log(r); return r.json()})
      .then(data => {
          console.log(data.data);
          const payload = data.data.createProject;

          window.location.replace('/project/' + payload.id);
      })  
  }

  handleInputChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleDropdownChange(e, { value }) {
      this.setState({ genre: value });
  }

  handleFileChange(event) {
      this.setState({ cover: event.target.files[0] });
  }

    render() {
        const { genre, cover } = this.state;
        return (
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.sectionContainer}>
                  <Text>Nombre del proyecto</Text>
                  <TextInput style={styles.inputText} onChangeText={this.handleInputChange}/> 
                </View>
                <View style={styles.sectionContainer}>
                  <Text>Género</Text>
                  <TextInput style={styles.inputText} onChangeText={this.handleDropdownChange}/>
                </View>
                <View style={styles.sectionContainer}>
                  <Button color={'purple'} onPress={this.createProject} title="Crear" /> 
                </View>
              </View>
            </ScrollView>
            
        );
    }
}


