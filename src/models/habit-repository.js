import DailyHabitModel from "./dailyHabit-schema.js";
import HabitModel from "./habit-schema.js";
import UserModel from "./user-schema.js";

export default class HabitRepository {
  //function to format today's date in 'month-date-year' format
  formatedTodayDate() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formatedDate = `${month}-${date}-${year}`;
    return formatedDate;
  }

  //function to get nth previous date from today's date in 'month-date-year' format
  getNthDate(nthDate) {
    const date = new Date();
    const newDate = new Date(date.setDate(date.getDate() - nthDate));
    return `${
      newDate.getMonth() + 1
    }-${newDate.getDate()}-${newDate.getFullYear()}`;
  }

  async defaultUserId() {
    //get default user id
    const defaultUser = await UserModel.find();

    //if no default user is there create a new dafault user
    if (defaultUser.length == 0) {
      const newUser = new UserModel();
      const defaultUser = await newUser.save();
      const defaultUserId = defaultUser._id;
      return defaultUserId;
    } else if (defaultUser.length > 0) {
      const defaultUserId = defaultUser[0]._id;
      return defaultUserId;
    }
  }

  async getToday() {
    try {
      const formatedDate = this.formatedTodayDate();

      //get all today habits
      const todayHabits = await DailyHabitModel.find({ date: formatedDate });

      //if not habits are there add from habits model with no action and get all today habits
      if (todayHabits.length == 0) {
        const allHabits = await HabitModel.find();
        allHabits.forEach(async (habit) => {
          const newTodayHabit = new DailyHabitModel({
            habitName: habit.habitName,
            date: formatedDate,
            status: "noAction",
            habitId: habit._id,
          });
          await newTodayHabit.save();
        });
        const addedTodayHabits = await DailyHabitModel.find({
          date: formatedDate,
        });
        return addedTodayHabits;
      } else {
        return todayHabits;
      }
    } catch (err) {
      throw err; // throw err to catch it in controller
    }
  }

  async postHabit(habitData) {
    try {
      const formatedDate = this.formatedTodayDate();

      //get default user id
      const defaultUserId = await this.defaultUserId();

      //add a new habit and add default user id reference to this new habit
      const newHabit = new HabitModel({
        habitName: habitData.habitName,
        notes: habitData.habitNote,
        date: formatedDate,
        userId: defaultUserId,
      });
      const savedHabit = await newHabit.save();
      //add a new habit to todays list
      const newTodayHabit = new DailyHabitModel({
        habitName: savedHabit.habitName,
        date: formatedDate,
        status: "noAction",
        habitId: savedHabit._id,
      });
      await newTodayHabit.save();
      return savedHabit;
    } catch (err) {
      throw err;
    }
  }

  async getHabitById(id) {
    return await HabitModel.findById(id);
  }

  async updateHabit(id, status) {
    //find and update the habit status
    const updatedHabit = await DailyHabitModel.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { returnOriginal: false }
    );
    return updatedHabit;
  }

  async getAllHabits() {
    //get all habits
    const allHabits = await HabitModel.find();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const formatedDate = this.formatedTodayDate();
    const firstDate = new Date(formatedDate);
    let done = [];
    //add number of days each habit has been done and return it with all habits
    await new Promise((resolve, reject) => {
      allHabits.forEach(async (habit) => {
        let doneHabits = await DailyHabitModel.find({
          habitName: habit.habitName,
          status: "done",
        });
        habit.doneDays = doneHabits.length;
        let secondDate = new Date(habit.date);
        if (firstDate - secondDate == 0) {
          let diffDays = 1;
          habit.totalDays = diffDays;
          done.push(habit.totalDays);
        } else {
          let diffDays = Math.round(
            Math.abs((firstDate - secondDate) / oneDay)
          );
          habit.totalDays = diffDays;
          done.push(habit.totalDays);
        }
        //if the loop has run for all the habit iterations resolve the promise
        if (done.length == allHabits.length) {
          resolve();
        }
      });
    }).then(() => {
      console.log("all done");
    });
    //return all habits after resolving the promise
    return allHabits;
  }

  // get records for past seven days of a habit
  async getAllRecords(id) {
    const sevenDays = [
      this.getNthDate(6),
      this.getNthDate(5),
      this.getNthDate(4),
      this.getNthDate(3),
      this.getNthDate(2),
      this.getNthDate(1),
      this.getNthDate(0),
    ];
    const allRecords = await DailyHabitModel.find({ habitId: id });
    const sevenDayRecords = allRecords.filter((record) => {
      return sevenDays.includes(record.date);
    });
    return sevenDayRecords;
  }
}
