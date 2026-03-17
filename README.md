# 🚀 CampusSyn

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Database](https://img.shields.io/badge/database-MongoDB-brightgreen)

CampusSyn is a role-based campus management web application designed to
streamline academic and event-related activities within an institution. 
The platform connects Admin, Teachers, Organizers, and Students in a unified 
system for efficient communication and management.

---

## 🌟 Overview

CampusSyn connects four types of users:

* Admin → Controls system
* Teacher → Manages academics
* Organizer → Handles events
* Student → Accesses assignments & updates

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router

### Backend (Planned)

* Node.js
* Express.js
* MongoDB

---

## 📁 Full Project Structure

```id="wudc0g"
Campus_Syn
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   │   └── db.js              # Database connection
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── assignmentController.js
│   │   ├── eventController.js
│   │   └── userController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Assignment.js
│   │   └── Event.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── eventRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔧 Backend Architecture (Explanation)

### 📦 config/

Handles database connection (MongoDB setup).

### 🎮 controllers/

Contains logic for:

* Authentication (login/register)
* Assignments
* Events
* Users

### 📊 models/

Defines database schemas:

* User (Admin, Teacher, Student, Organizer)
* Assignment
* Event

### 🛣️ routes/

Handles API endpoints:

* `/api/auth`
* `/api/assignments`
* `/api/events`
* `/api/users`

### 🔐 middleware/

Used for:

* Authentication (JWT)
* Role-based access control

---

## 🔗 API Flow

```id="sp9nh5"
Frontend (React)
        ↓
API Calls (Axios)
        ↓
Backend (Express)
        ↓
Database (MongoDB)
```

---

## 🖥️ Getting Started

### Frontend

```bash id="x7bfp4"
cd frontend
npm install
npm run dev
```

---

### Backend (Future Setup)

```bash id="xk8f1b"
cd backend
npm install
npm start
```

---

## 🔮 Future Features

* JWT Authentication system
* Role-based access control
* Assignment submission system
* Event registration system
* Notification & reminder system
* Admin analytics dashboard

---

## 📌 Status

🚧 Frontend completed (basic structure)
🚧 Backend structure planned (implementation in progress)

---

## 👨‍💻 Author

Nikhil Kumar
B.Tech Student
Chandigarh University

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
