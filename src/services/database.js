import Realm from 'realm'

import TodoList from '~/models/TodoList'
import Todo from '~/models/Todo'

const db = Realm.open({
  path: 'todolist.realm',
  schema: [TodoList.schema, Todo.schema]
})

export default db;
