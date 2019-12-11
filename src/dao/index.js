
import db from '~/services/database'
import TodoList from '~/models/TodoList'
import Todo from '~/models/Todo'

export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
  db.then(realm => {
    realm.write(() => {
      realm.create(TodoList.schema, newTodoList);
      resolve(newTodoList);
    })
  }).catch(error => {
    reject(error)
  })
})

export const updateTodoList = todoList => new Promise((resolve, reject) => {
  db.then(realm => {
    realm.write(() => {
      let updatingTodoList = realm.objectForPrimaryKey(TodoList.schema, todoList.id)
      updatingTodoList.name = todoList.name
      resolve();
    })
  }).catch(error => {
    reject(error)
  })
})

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
  db.then(realm => {
    realm.write(() => {
      let deletingTodoList = realm.objectForPrimaryKey(TodoList.schema, todoListId)
      realm.delete(deletingTodoList)
      resolve()
    })
  }).catch(error => {
    reject(error)
  })
})


export const deleteAllTodoLists = () => new Promise((resolve, reject) => {
  db.then(realm => {
    realm.write(() => {
      let allTodoList = realm.objects(TodoList.schema)
      realm.delete(allTodoList)
      resolve()
    })
  }).catch(error => {
    reject(error)
  })
})

export const queryAllTodoList = () => new Promise((resolve, reject) => {
  db.then(realm => {
    let allTodoList = realm.objects(TodoList.schema)
    resolve(allTodoList)
  }).catch(error => {
    reject(error)
  })
})
