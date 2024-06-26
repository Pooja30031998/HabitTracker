import mongoose from "mongoose";
import HabitRepository from "../models/habit-repository.js";

export default class HabitController {
  constructor() {
    this.repository = new HabitRepository();
  }

  //to display error page
  error(req, res, next) {
    return res.status(500).render("error", {
      error: "It Seems There Is Some Issue On The Server.",
    });
  }

  //show all habits for today in home page
  async getToday(req, res, next) {
    try {
      const todayHabits = await this.repository.getToday();
      return res.status(200).render("home", { habits: todayHabits });
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }

  //post a new habit and show all habits for today in home page
  async postHabit(req, res, next) {
    try {
      const habitDetails = req.body;
      const addedHabit = await this.repository.postHabit(habitDetails);
      if (addedHabit) {
        return res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      const duplicateKey = err.keyValue;
      if (duplicateKey) {
        return res.status(400).render("error", {
          error: "Habit name must be unique",
        });
      }
      return res.redirect("/500");
    }
  }

  //update a habit and show the update habit
  async updateHabit(req, res, next) {
    try {
      const id = req.params.id;
      const status = req.body.status;
      const updatedHabit = await this.repository.updateHabit(id, status);
      if (updatedHabit) {
        return res.redirect("/");
      } else {
        return res.status(400).render("error", {
          error: "Habit not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }

  //get all habits
  async getAllHabits(req, res, next) {
    try {
      const allHabits = await this.repository.getAllHabits();
      return res.status(200).render("habits", { habits: allHabits });
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }

  //get all records for 7 days
  async getAllRecords(req, res, next) {
    try {
      const id = req.params.id;
      const allRecords = await this.repository.getAllRecords(id);
      const habit = await this.repository.getHabitById(id);
      const habitName = habit.habitName;
      return res
        .status(200)
        .render("records", { records: allRecords, name: habitName });
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }

  //update a habit from records page and show the updated habit
  async updateRecordHabit(req, res, next) {
    try {
      const id = req.params.id;
      const status = req.body.status;
      const updatedHabit = await this.repository.updateHabit(id, status);
      if (updatedHabit) {
        return res.redirect(`/record/${updatedHabit.habitId}`);
      } else {
        return res.status(400).render("error", {
          error: "Habit not found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.redirect("/500");
    }
  }
}
