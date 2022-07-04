import Todo from "../../models/Todo.js";

const todoResolver = {
  Query: {
    async fetchTasks() {
      const todo = await Todo.find();

      return todo;
    },
  },
  Mutation: {
    async addTask(_, { addTaskInput: { task, isComplete } }) {
      const newTask = new Todo({ task, isComplete });

      const res = await newTask.save();

      return {
        id: res._id,
        ...res._doc,
      };
    },
    async removeTask(_, { taskId }) {
      const task = await Todo.findById({ _id: taskId });
      if (task) {
        // delete task
        const res = await Todo.deleteOne({ _id: taskId });
        return "Task deleted successfully";
      }

      throw new Error("Task Does Not Exist");
    },
  },
};

export default todoResolver;
