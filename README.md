🎓 School Management System

Welcome to the School Management System! This project is a comprehensive web application with a Flask backend and React frontend. It allows administrators, teachers, students, and guests to access and manage school information based on their roles. Whether you’re adding new students, tracking attendance, or checking out the latest school events, this system has you covered.

🌟 Features

Admin Dashboard: Manage students, teachers, classes, attendance, grades, and events with full control.
Teacher Dashboard: Keep track of attendance, grades, and manage classes.
Student Dashboard: Access class schedules, view events, and more.
Guest Dashboard: Explore information about classes, teachers, and upcoming events.


📋 Table of Contents

1. Getting Started
2. Frontend Setup
3. Backend Setup
4. Running the Application
5. Project Structure
6. Tech Stack


1. 🚀 Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js (for the frontend)
Python 3 (for the backend)
Pipenv (for managing the Python virtual environment)


2. 🖥️ Frontend Setup
Open a terminal and navigate to the client folder.
cd client;
Run the following to install all the necessary dependencies:
npm install
This installs everything needed to run the React app on your machine.


3. 🛠️ Backend Setup
Open another terminal and navigate to the server folder.
cd server;
Start the virtual environment:
pipenv shell
Install backend dependencies with:
pipenv install
Once installed, set up your database. The app is configured to use SQLite by default, but you can switch to another database if needed.

4. 🎉 Running the Application
To see everything in action, start both the frontend and backend servers.

Start the Backend Server
Ensure you’re in the server directory and that your virtual environment is active.

Run:
 python run.py
By default, the backend server runs at http://localhost:5000.

Start the Frontend Server
In a separate terminal, go to the client folder.

Run:
npm start
The React app will start on http://localhost:3000.

🎈 Usage
Once everything’s running:

Open http://localhost:3000 in your browser.
Register as a new user or login if you already have an account.
Based on your role (Admin, Teacher, Student, or Guest), you’ll be redirected to the appropriate dashboard with different features.

👩‍💼 Admin Actions
Admins have full control of the system. Here’s what they can do:

Students: Add, view, edit, and delete student records.
Teachers: Manage teachers, assign them to classes, and more.
Classes: Set up classes, assign teachers and students.
Attendance: Track and manage student attendance.
Grades: View, add, or edit student grades.
Events: Schedule and manage school-wide events.

🧑‍🏫 Teacher, Student, and Guest Dashboards
Teachers: View and manage their classes, enter grades, and track attendance.
Students: Access their schedules, check grades, and view events.
Guests: Limited view of school information without edit permissions.

🗂️ Project Structure
Here’s a quick rundown of the project structure:

client/: Contains the React frontend.
src/: All components, pages, and assets.
styles/: CSS files for consistent styling.
server/: Contains the Flask backend.
models/: Database models.
routes/: API routes and backend logic.



6. 🔧 Tech Stack
Frontend: React
Backend: Flask, SQLAlchemy
Database: SQLite (switchable to other databases)
Authentication: Role-based user access



We hope this School Management System simplifies managing school information for everyone involved. Happy coding, and feel free to expand the app to meet all your school’s needs!