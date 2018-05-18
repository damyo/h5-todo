import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo';
// import { TextInput, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: "",
  };

  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>H5 To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controllNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title: {
    color: "#fff",
    fontSize: 30,
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    width: width - 25,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      }
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
  },
});
