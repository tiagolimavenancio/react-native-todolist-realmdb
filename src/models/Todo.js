export default class Todo {
  static schema = {
    name: 'Todo',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: { type: 'string', indexed: true },
      done: { type: 'bool', default: false }
    }
  }
}
