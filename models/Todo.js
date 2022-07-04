import mongoose from "mongoose";

const { Schema, model } = mongoose;

const todoSchema = new Schema({
  task: String,
  isComplete: Boolean,
});

export default model("todo", todoSchema);
