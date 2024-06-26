import express from "express";
import HabitController from "../controllers/habit-controller.js";

//Creating Router
const habitRouter = express.Router();

//creating an instance of HabitController
const habitController = new HabitController();

//routes
//get home page
habitRouter.get("/", (req, res, next) => {
  habitController.getToday(req, res, next);
});

//update daily habit
habitRouter.post("/:id", (req, res, next) => {
  habitController.updateHabit(req, res, next);
});

//post habit
habitRouter.post("/", (req, res, next) => {
  habitController.postHabit(req, res, next);
});

//get all habits
habitRouter.get("/habits", (req, res, next) => {
  habitController.getAllHabits(req, res, next);
});

//get records
habitRouter.get("/record/:id", (req, res, next) => {
  habitController.getAllRecords(req, res, next);
});

//update daily habit in records
habitRouter.post("/record/:id", (req, res, next) => {
  habitController.updateRecordHabit(req, res, next);
});

//get error
habitRouter.get("/500", (req, res, next) => {
  habitController.error(req, res, next);
});

export default habitRouter;
