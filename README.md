**Simple Project Issue Tracker**

**Objective:**

Welcome! This assignment is designed to assess your full-stack development skills and give us an understanding of your approach to building web applications. Your task is to create a simple Project Issue Tracker application using React for the frontend and NestJS or ExpressJs for the backend. The goal is to demonstrate your proficiency in building UIs, creating APIs, handling data persistence, and implementing basic business logic.

**Context:**

Imagine a small team needs a very basic internal tool to keep track of different projects and the issues (tasks, bugs) associated with each project. This assignment involves building the core functionality for such a tool.

**Technical Stack:**

*   **Frontend:** React (with TypeScript)
*   **Backend:** NestJS or ExpressJs (with TypeScript)
*   **Database:** **Your choice.** You can use any database you are comfortable with (e.g., PostgreSQL, MySQL, MongoDB, SQLite). Please clearly document your choice and provide setup instructions (including seeding any initial data if necessary) in the README file.

**Core Requirements:**

You need to build an application with the following features:

**1. Frontend (React):**

*   **Pages (At least two):**
    *   `ProjectListPage`:
        *   Displays a list of all existing projects (showing at least the project name).
        *   Includes a way to create a new project (e.g., an input field and a button).
        *   Clicking on a project name should navigate the user to the `IssueListPage` for that specific project.
    *   `IssueListPage`:
        *   Displays issues *only* for the currently selected project.
        *   Shows key information for each issue (e.g., Title, Status, Priority).
        *   Includes a way to filter issues displayed based on their `Status`. The possible statuses are: 'To Do', 'In Progress', 'Done'.
        *   Includes a way to create a new issue for the *current* project.
*   **Components (At least four):**
    *   `ProjectList`: Component responsible for rendering the list of projects on the `ProjectListPage`.
    *   `CreateProjectForm`: A form component (can be simple, perhaps just an input for the project name and a submit button) used on the `ProjectListPage`.
    *   `IssueTable` / `IssueList`: Component responsible for displaying the list/table of issues on the `IssueListPage`. It should include controls or options for filtering by status.
    *   `CreateIssueForm`: A form component used on the `IssueListPage` to add a new issue. It should capture at least the `Title`, `Description` (optional but good), `Status` (defaulting to 'To Do'), and `Priority` (e.g., Low, Medium, High).

    Please don't be limited in creating components. The above points are just to give you a direction. Create as many components as you need. 

**2. Backend (NestJS/ExpressJs):**

*   **API Endpoints:** Implement the following RESTful API endpoints:
    *   `GET /projects`: Returns a list of all projects.
    *   `POST /projects`: Creates a new project. Expects `{ name: string }` in the request body. Returns the created project.
    *   `GET /projects/{projectId}/issues`: Returns a list of issues associated with the specified `projectId`. Should support filtering by status via a query parameter (e.g., `/projects/123/issues?status=InProgress`). If no status filter is provided, return all issues for that project.
    *   `POST /projects/{projectId}/issues`: Creates a new issue associated with the specified `projectId`. Expects issue details (title, description, status, priority) in the request body. Returns the created issue.
    *   `PATCH /issues/{issueId}`: Updates an existing issue. This should primarily be used to update the `Status` or `Priority` of an issue. Expects the fields to be updated in the request body (e.g., `{ status: 'Done' }`). Returns the updated issue.
*   **Backend Logic:**
    *   **Relational Data:** Correctly model and manage the one-to-many relationship between Projects and Issues in your chosen database. Ensure issues are always linked to a valid project.
    *   **Server-Side Filtering:** Implement the filtering logic for `GET /projects/{projectId}/issues` based on the `status` query parameter.
    *   **Data Validation:** Use NestJS built-in validation pipes (`ValidationPipe`) and DTOs (Data Transfer Objects) with decorators (`class-validator`, `class-transformer`) to validate incoming data for `POST` and `PATCH` requests (e.g., ensure required fields are present, status values are valid).
    *   **Partial Updates:** Ensure the `PATCH /issues/{issueId}` endpoint correctly handles partial updates, only modifying the fields provided in the request body.

**Bonus Features (Optional):**

These are not required, but feel free to implement any if you have time and wish to showcase further skills:

* Setting up Docker to run frontend, backend, database. TIP: docker compose file.
*   Add sorting capabilities to the issue list (e.g., by priority, creation date).
*   Allow editing of existing project names or issue details (beyond just status/priority).
*   Implement basic pagination for the project or issue lists.
*   Add simple unit or integration tests for your backend endpoints/logic.
*   Basic search functionality for projects or issues.

**Deliverables:**

*   A link to a Git repository (e.g., GitHub, GitLab) containing your complete source code for both the frontend and backend OR your code archived in a file. 
*   A comprehensive `README.md` file in the repository root that includes:
    *   Clear instructions on how to set up and run the frontend application.
    *   Clear instructions on how to set up and run the backend application.
    *   Details about your chosen database, including setup instructions (e.g., connection strings/environment variables needed, migration commands if any). Mention *why* you chose this database.
    *   Instructions on how to seed the database with any necessary initial data (if applicable).
    *   Any assumptions you made while working on the assignment.
    *   (Optional) A brief description of your approach or any challenges faced.

**Evaluation Criteria:**

We will evaluate your submission based on the following:

*   **Functionality:** Does the application meet the core requirements?
*   **Code Quality:** Is the code clean, well-organized, readable, and maintainable? (Consider both frontend and backend).
*   **React Implementation:** Effective use of components, state management, props, and handling API interactions.
*   **NestJS Implementation:** Proper use of modules, controllers, services, DTOs, and validation.
*   **API Design:** Is the REST API logical and well-designed?
*   **Backend Logic:** Is the filtering, data validation, and relationship handling implemented correctly?
*   **Database Interaction:** Sensible database schema design and correct interaction from the backend service layer.
*   **Error Handling:** Basic error handling is implemented (e.g., handling non-existent project IDs).
*   **README:** Clarity and completeness of the setup and run instructions.

**Timeframe Suggestion:**

We estimate this assignment might take approximately **6-10 hours** of focused work. However, this is just a guideline. Please take the time you feel you need to produce work that you are proud of. We value quality over speed. Please aim to submit it within 2-3 days.

**Questions:**

If you have any questions about the requirements, please don't hesitate to reach out to us.

We look forward to seeing your work! Good luck!

Team Truxie.
