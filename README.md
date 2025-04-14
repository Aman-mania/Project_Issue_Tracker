# Project Issue Tracker

A simple project issue tracker application built with React (frontend) and Express.js (backend) using TypeScript.

## Features

- Create and view projects
- Create and view issues for each project
- Filter issues by status
- Update issue status

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB (using Mongoose)

## Why MongoDB?

MongoDB was chosen for this project because:

1. **Schema Flexibility**: The document-based structure allows for easy adaptation as requirements evolve.
2. **Quick Setup**: No need for complex migrations or schema definitions.
3. **Natural JSON Format**: Works seamlessly with JavaScript/TypeScript and REST APIs.
4. **Scalability**: Can easily scale horizontally if needed.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
    cd backend

2. Install dependencies:
   ```bash
    npm install

3. Create a `.env` file in the backend directory with the following content:
   ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/issue-tracker

Note: If you're using MongoDB Atlas, replace the URI with your connection string.

4. Start the development server:
   ```bash
    npm run dev

The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
    cd frontend
2. Install dependencies:
   ```bash
    npm install

3. Start the development server:
   ```bash
    npm start

The application will open in your browser at http://localhost:3000

## API Endpoints

- `GET /projects` - Get all projects
- `POST /projects` - Create a new project
- `GET /projects/:projectId/issues` - Get all issues for a project (with optional status filter)
- `POST /projects/:projectId/issues` - Create a new issue for a project
- `PATCH /issues/:issueId` - Update an issue

## Database Structure

### Project Schema
{
    name: String,
    createdAt: Date,
    updatedAt: Date
}

### Issue Schema
{
    title: String,
    description: String (optional),
    status: String (enum: 'To Do', 'In Progress', 'Done'),
    priority: String (enum: 'Low', 'Medium', 'High'),
    project: ObjectId (reference to Project),
    createdAt: Date,
    updatedAt: Date
}


## Assumptions

- Users will access the application through a modern web browser
- MongoDB is available for data storage
- The application will be used by a small team with a limited number of projects and issues
- No authentication is required for this version

## Future Improvements

- Add user authentication and authorization
- Implement pagination for projects and issues
- Add sorting capabilities
- Allow editing of project names and issue details
- Add search functionality
- Implement unit and integration tests