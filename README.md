# Project_Management_System

## 🚀 Overview

PMS (Performance Management System) is a role-based web application designed to streamline employee performance tracking, goal management, and feedback processes within an organization.

The system replaces manual workflows (emails, spreadsheets) with a centralized platform that enables:

* Goal creation and approval
* Structured feedback collection
* Role-based dashboards
* Performance tracking

---

## 🎯 Problem Statement

Organizations face challenges such as:

* No centralized system for tracking goals and performance
* Unstructured and inconsistent feedback
* Lack of visibility for managers and admins
* Manual and inefficient review processes

---

## ✅ Solution

This project provides a **centralized PMS platform** where:

* Employees can create and track goals
* Managers can approve and evaluate goals
* Admins can monitor overall performance

---

## 🧑‍💻 User Roles

### 👤 Employee

* Create goals
* Submit feedback
* View personal goals and status

### 👨‍💼 Manager

* Approve/reject goals
* View team goals
* Provide feedback

### 🛠️ Admin

* View all data
* Monitor system activity
* Access overall dashboard

---

## ✨ Features

### 🎯 Goal Management

* Create goals (Employee)
* Approve goals (Manager)
* Status tracking: `Pending → Approved`

### 📝 Feedback System

* Employee self-feedback
* Manager feedback
* Stored in database

### 📊 Dashboard

* Employee → personal goals
* Manager → team goals & approvals
* Admin → system overview

---

## 🏗️ Architecture

### 🔹 High-Level Architecture

```
Frontend (React)
        ↓
Backend (Node.js + Express)
        ↓
Database (MongoDB)
```

---

## 🧠 Design Approach

* Followed **modular architecture**
* Separated:

  * Routes
  * Controllers
  * Models
* Used REST APIs for communication
* Built MVP focusing on core features

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Axios
* CSS / Tailwind (if added)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📂 Project Structure

### Backend

```
src/
 ├── models/
 ├── controllers/
 ├── routes/
 └── server.js
```

### Frontend

```
src/
 ├── components/
 ├── pages/
 ├── services/
 └── App.js
```

---

## 🔗 API Endpoints

### Goals

* `POST /api/goals` → Create goal
* `GET /api/goals` → Get all goals
* `PUT /api/goals/:id/approve` → Approve goal

### Feedback

* `POST /api/feedback` → Submit feedback
* `GET /api/feedback` → Get feedback

---

## 🧪 How to Run Locally

### Backend

```bash
cd pms-backend
npm install
npx nodemon src/server.js
```

### Frontend

```bash
cd pms-frontend
npm install
npm start
```
## 🚀 Future Improvements

* Authentication (JWT)
* Role-based authorization
* Goal weightage system
* Email notifications
* Advanced dashboard analytics

---

## 💡 Key Learnings

* Converted product requirements into a working system
* Built full-stack architecture
* Designed APIs and integrated frontend-backend
* Improved problem-solving and system design skills

---

## 📌 Evaluation Focus

This project demonstrates:

* How I interpret requirements
* How I design systems
* How I implement features

---

## 👩‍💻 Author

Neha Kumari
👉 Write your **Google Docs design document** (for submission)
👉 Help you **explain this confidently in interview (very important)**
