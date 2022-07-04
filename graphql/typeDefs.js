import { gql } from "apollo-server-express";

export default gql`
  type Task {
    id: ID!
    task: String!
    isComplete: Boolean!
  }

  type Query {
    fetchTasks: [Task!]!
  }

  type Mutation {
    addTask(addTaskInput: AddTaskInput!): Task!
    removeTask(taskId: ID!): String!
  }

  input AddTaskInput {
    task: String!
    isComplete: Boolean!
  }
`;
