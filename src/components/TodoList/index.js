import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { updateTodoList, deleteTodoList, queryAllTodoLists, filterTodoLists } from '~/dao';
import realm from '~/services/database';

import HeaderComponent from '../Header';
import PopupDialogComponent from '../PopUp'

import { SORT_ASCENDING, SORT_DESCENDING } from '~/constants/sort';

let FlatListItem = props => {
  const { itemIndex, id, name, creationDate, popupDialogComponent, onPressItem } = props;

  showEditModal = () => {
    popupDialogComponent.showDialogComponentForUpdate({
      id, name
    });
  }

  showDeleteConfirmation = () => {
      Alert.alert(
          'Delete',
          'Delete a todoList',
          [
              {
                  text: 'No', onPress: () => { }, //Do nothing
                  style: 'cancel'
              },
              {
                  text: 'Yes', onPress: () => {
                    deleteTodoList(id).then().catch(error => {
                      alert(`Failed to delete todoList with id = ${id}, error=${error}`);
                    });
                  }
              },
          ],
          { cancelable: true }
      );
  };
  return (
      <Swipeout right={[
          {
              text: 'Edit',
              backgroundColor: 'rgb(81,134,237)',
              onPress: showEditModal
          },
          {
              text: 'Delete',
              backgroundColor: 'rgb(217, 80, 64)',
              onPress: showDeleteConfirmation
          }
      ]} autoClose={true}>
          <TouchableOpacity onPress={onPressItem}>
              <View style={{ backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>{ name }</Text>
                  <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>{ creationDate.toLocaleString() }</Text>
              </View>
          </TouchableOpacity>
      </Swipeout>
  );
}

export default function TodoList() {

  const [todoLists, setTodoLists] = useState([])
  const [sort, setSort] = useState(SORT_ASCENDING)
  const [searchedName, setSearchedName] = useState('')

  useEffect(() => {
    reloadData();
    realm.addListener('change', () => {
        reloadData();
    });
  }, [])

  reloadData = () => {
    queryAllTodoLists().then((data) => {
      setTodoLists(data);
    }).catch((error) => {
      setTodoLists([]);
    });
  }

  onHandleSort = () => {
    setSort(sort === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING)
    setTodoLists(todoLists.sorted("name", sort === SORT_DESCENDING ? true : false))
  }

  return (
    <View style={styles.container}>
        <HeaderComponent title={"Todo List"}
            hasAddButton={true}
            hasDeleteAllButton={true}
            hasSortButton={true}
            onHandleSort={onHandleSort}
            sort={sort}
            showAddTodoList={() => refs.popupDialogComponent.showDialogComponentForAdd() } />
        <TextInput style={styles.textInput} placeholder="Enter text to search" autoCorrect={false}
            onChangeText={(text) => {
                setSearchedName(text);
                filterTodoLists(text).then(filteredTodoLists => {
                    setTodoLists(filteredTodoLists);
                }).catch(error => {
                  setTodoLists([]);
                });
            }}
            value={ searchedName } />
        <FlatList
            style={styles.flatList}
            data={todoLists}
            renderItem={({ item, index }) => <FlatListItem { ...item } itemIndex={index}
                popupDialogComponent={ refs.popupDialogComponent }
                onPressItem={() => {
                    alert(`You pressed item `);
                }} /> }
            keyExtractor={item => item.id} />
        <PopupDialogComponent ref={(c) => popupDialogComponent = c } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  flatList: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    height: 40,
    padding: 10,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
});
