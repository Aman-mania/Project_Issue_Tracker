# Project Issue Tracker

A full-stack issue tracker that allows teams to manage projects and their corresponding issues efficiently. Built using **React** and **Express.js**, both powered by **TypeScript**, and backed by **MongoDB**.

### Dashboard/Homepage: 
![image](https://github.com/user-attachments/assets/f11cce56-fff8-40d0-a191-5c85f9b3356f)

---

##  Features

-  Create and view multiple projects
-  Track issues within each project
-  Update issue status (To Do, In Progress, Done)
-  Filter issues based on status
-  Search Issues/Projects manually
-  Prioritize issues by level (Low, Medium, High)

---

## Tech Stack

| Layer     | Tech                             |
|-----------|----------------------------------|
| Frontend  | React.js (TypeScript) |
| Backend   | Express.js (TypeScript)          |
| Database  | MongoDB with Mongoose ORM        |
| API       | RESTful API                      |
| Tools     | Docker, Railway, GitHub          |

---

## Why MongoDB?

- **Flexible Schema**: Easily adapt as the data model evolves
- **Natural JSON Support**: Works natively with JavaScript and TypeScript
- **Minimal Setup**: Quick development without schema migrations
- **Scalable**: Can scale horizontally with ease for larger applications

---

## Screenshots / Demonstration

## Project List 
![image](https://github.com/user-attachments/assets/d6778aad-5c7b-4cf3-8dfb-61bcb4d7bd57)

## Create/add Project Form: 
![image](https://github.com/user-attachments/assets/1ed40633-399e-4942-b97b-c9c65c8426a5)

## List of issues for each project:
![image](https://github.com/user-attachments/assets/6cf0c362-80b9-4c7b-aed5-bbda9461887b)

## Create/add Issue Form:
![image](https://github.com/user-attachments/assets/74d41e2d-4a89-4f0a-bcd2-4ad705f4932a)

## Status Filter:
![image](https://github.com/user-attachments/assets/c0f06e76-372c-437a-9879-d07d66946da7)

## Sort Feature (Sort by last updated):
![image](https://github.com/user-attachments/assets/c77e6571-4d1c-4fa0-9d38-8c3c9562da73)

## Sort by priority:
![image](https://github.com/user-attachments/assets/9eb11059-f1d6-45ce-a31c-28ecc3b35ea6)

## Search Feature for Issues (Input: 1):
![image](https://github.com/user-attachments/assets/7266e71e-2dc4-4b0b-b365-77076aaab715)

## Search Feature for Projects (Input: 4):
![image](https://github.com/user-attachments/assets/99e48a83-0839-4884-8006-7b4c6596042b)

## Edit Issue:
![image](https://github.com/user-attachments/assets/a7784ea8-5fdc-43e8-9346-9c2017014671)

## Edit Project name:
![image](https://github.com/user-attachments/assets/9ed4217f-aff6-482a-9fb5-4dcf15a0d068)

## Change Status of Issue:
![image](https://github.com/user-attachments/assets/21c2b69c-cf1b-4582-a05c-a5ee7c87caad)

## Paging (Viewing page 1):
![image](https://github.com/user-attachments/assets/b0222847-df12-42a4-a3bf-ec578b3d326b)

## Paging (Viewing page 2): 
![image](https://github.com/user-attachments/assets/ed16c853-1049-4483-8805-5aabab9c6b23)

---

## Prerequisites

- Node.js v14+
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)
- Docker (optional, for containerization)

---

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```
### Frontend Setup

```bash
cd frontend
npm install
```

# Set Up Environment Variables:
Create an .env file for each fronend and backend directory:

## For Backend
```bash
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>/issue-tracker
```
## For Frontend
```bash
REACT_APP_API_URL=<YOUR backend Server URL>
#In my case: http://localhost:5000
```
### Frontend Setup

```bash
npm run dev
# Server runs at http://localhost:5000
```

### API Endpoints

Method	Endpoint	Description
GET	/projects	Fetch all projects
POST	/projects	Create a new project
GET	/projects/:projectId/issues	Get issues for a project (with optional status)
POST	/projects/:projectId/issues	Create issue in a project
PATCH	/issues/:issueId	Update issue status

### Database Structure
1). Project Schema
{
  name: String,
  createdAt: Date,
  updatedAt: Date
}

2). Issue Schema
{
  title: String,
  description: String,
  status: 'To Do' | 'In Progress' | 'Done',
  priority: 'Low' | 'Medium' | 'High',
  project: ObjectId (ref to Project),
  createdAt: Date,
  updatedAt: Date
}

### Assumptions
> No user authentication (open access)
> Small teams with limited issues/projects
> Used via a modern web browser
> MongoDB is set up and running

### Future Improvements
> Add authentication (JWT/OAuth) -Can use my existing Auth_API

### Thank You 
~[AMAN BISWAKARMA]
