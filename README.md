# The Kanban Board

## 📌 Project Overview
The Kanban Board is a full-stack web application designed to help users manage tasks visually. It enables users to create, update, and track tickets, providing an efficient workflow for task management.

## 🚀 Features
- User authentication with JWT
- Create, read, update, and delete (CRUD) tickets
- Persistent database storage using PostgreSQL
- RESTful API backend with Express.js
- Frontend built with React and TypeScript
- Hosted on Render for seamless deployment

## 🛠️ Technologies Used

### Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)

### Deployment:
- Render (Server & Database)

- Password to sign in is Username: JollyGuru - Passowrd is password 


## 🖥️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/TheKanbanBoard.git
cd TheKanbanBoard

Install Dependencies 
npm install

Set up an .ENV file
DATABASE_URL=postgres://your-user:your-password@your-db-host:5432/your-db-name
JWT_SECRET_KEY=your-secret-key
RUN_SEED=true
PORT=10000

Build and Seed Database
npm run build && npm run seed

Start the Application
npm run start

📌 API Endpoints
Authentication
POST /auth/login – Login with username & password
POST /auth/register – Register a new user
Tickets
GET /api/tickets – Fetch all tickets
GET /api/tickets/:id – Fetch a specific ticket
POST /api/tickets – Create a new ticket
PUT /api/tickets/:id – Update a ticket
DELETE /api/tickets/:id – Delete a ticket

👥 Contributors
My Github user name - mauricek12d




