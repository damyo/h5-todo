import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo';
import { AppLoading } from 'expo';
import uuidv1 from "uuid/v1";
// import { TextInput, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: true,
    toDos: {},
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    if(!loadedToDos) {
      return <AppLoading />;
    } else {
      // return {this._loadTodos}
    }
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
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} />)}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    });
  }
  _loadTodos = () => {
    this.setState({
      loadedToDos: true,
    })
  }
  _addToDo = () => {
    const { newToDo } = this.state;
    if(newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now(),
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return { ...newState };
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2c4b',
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
    borderBottomColor: '#333',
    borderBottomWidth: 3,
    fontSize: 25,
  },
  toDos: {
    alignItems: 'center',
  }
});
