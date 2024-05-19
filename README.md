# NIYO Task Management System Application

## Table of Contents

- [General Information](#general-information)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Usage](#usage)
- [Postman Documentation](#postman-documentation)

---

## General Information

The NIYO Task Management System is a Node.js REST API application built using the NestJS framework, which is based on Express and supports TypeScript. It utilizes PostgreSQL as the database management system and JWT for authentication. This API serves as the backend for a task management system. Users can register and authenticate by logging in. A cookie containing a JWT token, which expires after 24 hours, is generated upon login. Users can log out by clearing the cookie.

---

## Dependencies

The following dependencies are required for the application:

- `argon2`
- `cookie-parser`
- `express`
- `express-session`
- `passport`
- `passport-jwt`
- `passport-local`
- `prisma`
- `postgresql`
- `pg`
- `pg-hstore`
- `prettier`
- `@nestjs/config`

---

## Setup

1. Clone this repository to your desktop:
   ```sh
   git clone https://github.com/peterihimire/niyo-tms-app.git
   ```
2. Change directory into the project folder:
   ```sh
   cd niyo-tms-app
   ```
3. Create a .env file:
   ```sh
   touch .env
   ```
4. Copy the following environment variables to your .env file and customize them as needed:
   ```txt
   PORT=8090
   DATABASE_URL=postgresql://postgres:testing123@localhost:5432/task_manager?schema=public
   JWT_SECRET=randomsecretforyou
   ```
5. Install the dependencies:
   ```sh
   npm install
   ```
6. Generate the Prisma client:
   ```sh
   npx prisma generate
   ```
7. Start the application:
   ```sh
   npm run start
   ```
8. To test the API endpoints, use Postman or Insomnia. Optionally, add a global environment variable for the base URL (http://127.0.0.1:8090/api/taskmgt/v1) and name it as desired (e.g., {{TMS}}).

---

## Usage

The application is divided into two main sections: the HTTP section serving the REST API and the WebSocket (Socket.IO) section for real-time communication.

- The REST API handles user signup, signin, user information, and task CRUD operations.
- The WebSocket section manages real-time updates for task creation, updates, and deletion.

### REST API Examples

- **Signup User:** Use this endpoint: http://127.0.0.1:8090/api/taskmgt/v1/auth/signup. The response will look like this:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1716117055/Screenshot_2024-05-19_at_11.21.44_AM_gwdcmq.png)
- **Signin User:** Use this endpoint: http://127.0.0.1:8090/api/taskmgt/v1/auth/signin. A JWT token will be attached to a cookie in the response header:
  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1716117054/Screenshot_2024-05-19_at_11.24.34_AM_tonfxh.png)
- **Create Task:** Use this endpoint: http://127.0.0.1:8090/api/taskmgt/v1/tasks/add_task. First, select Bearer Token in the Authorization tab and paste the token from the signin response. Then, add the following fields in the Body tab:

  ```json
  {
    "title": "Your Task Title",
    "desc": "Task Description",
    "status": "PENDING",
    "dueDate": "2024-05-19T11:00:00.000Z",
    "category": "WORK",
    "priority": "MEDIUM"
  }
  ```

  Enum values for reference:

  ```typescript
  enum TaskStatus {
    PENDING,
    INPROGRESS,
    COMPLETE,
  }

  enum TaskCategory {
    WORK,
    PERSONAL,
    URGENT,
    HOME,
    SCHOOL,
    OTHER,
  }

  enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH,
  }
  ```

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1716117055/Screenshot_2024-05-19_at_11.26.16_AM_hxlwhy.png)

  ### Websocket(Socket.IO) Examples

  - **Connect to the Websocker Server:** In Postman, create a new request and select the Socket.IO protocol. Enter the base URL: `http://127.0.0.1:8090/api/taskmgt/v1`.
    ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1716118073/Screenshot_2024-05-19_at_12.24.13_PM_as0msi.png)
  - **Listen to Events:** Add events for `taskCreated`,`taskUpdated` , and `taskDeleted`. Turn on the listening for these events and connect to the server. You should see a connection confirmation message.
    ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1716118073/Screenshot_2024-05-19_at_12.25.23_PM_t4icin.png)

---

## Postman Documentation

For more detailed information and API documentation, visit the [Postman Documentation](https://documenter.getpostman.com/view/12340633/2sA3QmCuJs).

 