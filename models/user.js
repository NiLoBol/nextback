import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true ,unique: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    todo: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
