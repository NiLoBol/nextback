import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    todo: [
      {
        title: String,
        clickbox: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
