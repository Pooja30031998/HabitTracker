import mongoose from "mongoose";

const DailyHabitSchema = new mongoose.Schema({
  habitName: { type: String, required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["noAction", "done", "notDone"],
  },
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "habit" },
});

//creating and exporting model
const DailyHabitModel = mongoose.model("dailyHabit", DailyHabitSchema);
export default DailyHabitModel;
