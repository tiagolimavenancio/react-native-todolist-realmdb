import Todo from './Todo'

export default class TodoList {
  static schema = {
   name: 'TodoList',
   primaryKey: 'id',
   properties: {
     id: 'int',
     name: 'string',
     creationDate: 'date',
     todos: { type: 'list', objectType: Todo.schema }
   }
  }
}
