# Task Manager Application

A modern full-stack task management application featuring an decoupled architecture with a secure Java Spring Boot REST API, a responsive React frontend, and a persistent MySQL database.

---

## Important Setup Requirement

Before launching the application backend, you **must** update the database credentials to match your local development environment:

1. Open `backend/src/main/resources/application.properties`.
2. Locate the `spring.datasource.password` property.
3. Update it to your local MySQL password.

---

## Architecture & Core Stack

*   **Backend:** Java Spring Boot, Spring Web, Spring Data JPA, Hibernate.
*   **Frontend:** React.js, Vite, Axios, Modern Semantic CSS.
*   **Database:** MySQL relational schema utilizing Object-Relational Mapping (ORM).

---

## Installation & Getting Started

### 1. Database Setup

Log into your local MySQL instance via your terminal or database client and create the schema:
```sql
CREATE DATABASE taskmanager;

### 2. Backend Configuration and Execution

Navigate to backend/src/main/resources/application.properties and verify your connection profile:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager
spring.datasource.username=root
spring.datasource.password=YOUR_LOCAL_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update

2. Open the backend project directory in your preferred IDE (IntelliJ IDEA, Eclipse, or VS Code).
3. Allow your build tool to resolve the dependencies declared in `pom.xml`.
4. Execute the application through your IDE or run the following command in the backend root directory:
   ```bash
   mvn spring-boot:run
   
The API server will initialize at: http://localhost:8080

### 3. Frontend Installation & Execution

Open a new terminal window and navigate to the frontend directory:

Bash
cd frontend
//Install the production and development dependencies:

Bash
npm install

3. Launch the Vite local development server:
   ```bash
   npm run dev
   
The client interface will spin up locally (typically at http://localhost:5173). Open this URL in your web browser.

REST API Specification:
All network communication runs asynchronously via an Axios instance pre-configured with a /api root prefix and global security headers (withCredentials: true) to retain session integrity:


Endpoint,HTTP Method,Action / Purpose,Expected JSON Request Payload
/api/auth/register,POST,Provisions a new user account,"{ ""email"": ""user@example.com"", ""password"": ""securePassword"" }"
/api/auth/login,POST,Authenticates user credentials,"{ ""email"": ""user@example.com"", ""password"": ""securePassword"" }"
/api/tasks,GET,Fetches all active assignments,None
/api/tasks,POST,Generates a new task record,"{ ""title"": ""Task Title"", ""description"": ""Details..."", ""status"": ""IN_PROGRESS"", ""user"": { ""id"": 1 } }"
/api/tasks/{id},DELETE,Permanently deletes a task record,None (ID supplied as a Path Variable)