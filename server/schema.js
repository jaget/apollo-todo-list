const { gql } = require("apollo-server");

const typeDefs = gql`
  type TodoItem {
    id: ID!
    label: String!
    completed: Boolean
  }

  type TodoList {
    id: ID!
    name: String!
    todoItems: [TodoItem]
  }

  type Query {
    todoLists: [TodoList]
    todoList(id: ID!): TodoList
  }

  type Mutation {
    addTodoList: TodoList
    addTodoListItem: TodoItem
  }
`;

module.exports = typeDefs;
