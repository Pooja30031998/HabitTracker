import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "defaultUser",
  },
  date: { type: Date, default: new Date() },
});

//creating and exporting model
const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
