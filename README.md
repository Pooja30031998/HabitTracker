# HabitTracker
This is a full-stack Habit Tracker web application built with Node.js, Express.js, and EJS. It allows users to define their habits and track their progress over time.

# Descrition
The Habit Tracker app enables users to create and manage their habits effectively. Users can define various habits they want to track, such as reading a book, going for a run, drinking water, etc. Once defined, users can mark each habit as done, not done, or no action for each day. The app provides a visual representation of habit progress and shows the number of days the user completed that habit since the user created the habit, making it easy for users to stay motivated and consistent with their habits.

# Features
- Habit management: Users can define their habits and edit existing habits.
- Daily habit tracking: Users can mark each habit as done, not done, or no action for each day.

# Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript) for templating
- MongoDB for database storage

# Installation
1. Clone the repository
2. Install dependencies using `npm install`
3. Set up environment variables in .env file
4. Start the server using `node index.js`

# API Documentation
## Routes

### Get Home Page
- URL: ``` / ```
- Method: ```GET```
- status:200
- Description: Get today's habit tracher page

### Get all Habits
- URL: /habits
- Method: GET
- status:200
- Description: Retrieve all habits.

### Get Habit Record Page
URL: ```/record/:id```
Method: ```GET```
Request Parameters: id (ID of the habit schema)
status:200
Description: Retrieve the record page for a specific habit.

### Post a new habit (Habit page is a model. Thus not need for Get habit page) 
- URL: ```/```
- Method: ```POST```
- status:200
- Description: Post a new habit and track it in today's page.

### Update Habit Status in today's page
- URL: ```/:id```
- Method: ```POST```
- status:200
- Request Parameters: id (ID of the dailyhabit schema)
- Response: Redirect to today's tracking page after updating the new habit status.

### Update Habit Status in record page
- URL: ```/record/:id```
- Method: ```POST```
- status:200
- Request Parameters: id (ID of the dailyhabit schema)
- Response: Redirect to record tracking page after updating the new habit status.

### Error page
- URL: ```/500```
- Method: ```GET```
- status:500
- Description: To show server side error

# Contributing
Contributions are welcome! Please create a new branch for your changes and submit a pull request for review.

# Hosted URL
You can access the deployed Habit Tracker app [here]().




