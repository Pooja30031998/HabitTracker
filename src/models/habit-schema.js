import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
    unique: [true, "Habit name must be unique"],
  },
  notes: { type: String },
  date: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

//mongoose schema pre middleware to make all habit name to upper case befor saving it to the collection
HabitSchema.pre("save", function () {
  this.habitName = this.habitName.toUpperCase();
});

//creating and exporting model
const HabitModel = mongoose.model("habit", HabitSchema);
export default HabitModel;
