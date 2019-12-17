import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    Platform, Image, TextInput
} from "react-native";

import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { insertNewTodoList, updateTodoList } from '~/dao';

export default function PopUp() {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')
  const [isAddNew, setIsAddNew] = useState(true)

  showDialogComponentForAdd = () => {
    refs.popupDialog.show();
    setDialogTitle('Add a new TodoList')
    setName('')
    setIsAddNew(true)
  }

  showDialogComponentForUpdate = (existingTodoList) => {
    refs.popupDialog.show();
    setDialogTitle('Update a TodoList')
    setId(existingTodoList.id)
    setName(existingTodoList.name)
    setIsAddNew(false)
  }

  return (
    <PopupDialog
      dialogTitle={ <DialogTitle title={dialogTitle} /> }
      width={0.7} height={180}
      ref={(c) => popupDialog = c}>
        <View style={styles.container}>
              <TextInput style={styles.textInput} placeholder="Enter TodoList name" autoCorrect={false}
                  onChangeText={(text) => setName(text)} value={ name } />
              <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.button} onPress={() => {
                      if (name.trim() == "") {
                          alert("Please enter todoList' name");
                          return;
                      }
                      refs.popupDialog.dismiss(() => {
                          if (isAddNew == true) {
                              const newTodoList = {
                                  id: Math.floor(Date.now() / 1000),
                                  name,
                                  creationDate: new Date()
                              };
                              insertNewTodoList(newTodoList).then().catch((error) => {
                                  alert(`Insert new todoList error ${error}`);
                              });
                          } else {
                            const todoList = {
                                id,
                                name,
                            };
                            updateTodoList(todoList).then().catch((error) => {
                                alert(`Update todoList error ${error}`);
                            });
                          }
                      });
                  }}>
                      <Text style={styles.textLabel}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => {
                      refs.popupDialog.dismiss(() => {
                          console.log('Called Cancel, dismiss popup')
                      });
                  }}>
                      <Text style={styles.textLabel}>Cancel</Text>
                  </TouchableOpacity>
              </View>
          </View>
    </PopupDialog>
  );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
  textInput: {
      height: 40,
      padding: 10,
      margin: 10,
      borderColor: 'gray',
      borderWidth: 1
  },
  button: {
      backgroundColor: 'steelblue',
      padding: 10,
      margin: 10
  },
  textLabel: {
      color: 'white',
      fontSize: 18,
  }
});
