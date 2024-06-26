import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/HabitTracker");
    console.log("MongoDB connected using mongoose");
  } catch (error) {
    console.log(error);
  }
};
