import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    Platform, Image, Alert
} from "react-native";

import { deleteAllTodoLists } from '~/dao';

import { SORT_ASCENDING, SORT_DESCENDING } from '~/constants/sort';

export default function Header(props) {

  const { title, showAddTodoList, hasAddButton,
    hasSortButton, onHandleSort, sort, hasDeleteAllButton
    } = props;

  var sortIcon = sort === SORT_ASCENDING ?
    require('~/assets/images/sort-asc-icon.png') :
    require('~/assets/images/sort-desc-icon.png')

  return (
    <View style={styles.container}>
      {
        hasAddButton && <TouchableOpacity style={styles.addButton} onPress={showAddTodoList}>
            <Image style={styles.addButtonImage} source={ require('~/assets/images/add-icon.png') } />
        </TouchableOpacity>
      }
      <View style={{ flexDirection: row, justifyContent: 'space-around', alignItems: 'center',}}>
        <Text style={styles.titleText}>
            { title }
        </Text>
        {
          hasSortButton && <TouchableOpacity style={styles.addButton} onPress={onHandleSort}>
              <Image style={styles.sortButtonImage} source={sortIcon} />
          </TouchableOpacity>
        }
      </View>
      {
        hasDeleteAllButton && <TouchableOpacity style={styles.addButton} onPress={
              ()=> {
                  Alert.alert(
                      'Delete all',
                      'Are you sure you want to delete all todoLists ?',
                      [
                          {
                              text: 'No', onPress: () => { },//Do nothing
                              style: 'cancel'
                          },
                          {
                              text: 'Yes', onPress: () => {
                                  deleteAllTodoLists().then().catch(error => {
                                      alert(`Delete all TodoLists failed. Error = ${error}`);
                                  });
                              }
                          },
                      ],
                      { cancelable: true }
                  );
              }}>
              <Image style={styles.deleteButtonImage} source={require('~/assets/images/delete-icon.png')}/>
          </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(224, 93, 144)',
    height: Platform.OS === 'ios' ? 100 : 80,
  },
  titleText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      position: 'absolute',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 50
  },
  addButton: {
      zIndex: 2,
      marginRight: 10,
      marginTop: 30,
  },
  addButtonImage: {
      width: 42,
      height: 42,
      tintColor: 'white'
  },
  deleteButtonImage: {
      width: 26,
      height: 26,
      tintColor: 'white'
  },
  sortButtonImage: {
    width: 26,
    height: 26,
    tintColor: 'white'
  }
});


