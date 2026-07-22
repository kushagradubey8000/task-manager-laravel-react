# Task Manager — Laravel + React + MySQL

A full-stack task management application with a RESTful API backend built in **Laravel** and a **React** frontend, backed by **MySQL**. Built as a portfolio project to demonstrate REST API design, Eloquent ORM usage, and full-stack integration.

## Features

- Create, read, update, and delete tasks (full CRUD)
- Filter tasks by status (`pending`, `in_progress`, `completed`) and priority (`low`, `medium`, `high`)
- Mark tasks complete/pending with a single click
- Due date tracking
- Request validation and structured JSON responses on the API
- Clean layered backend architecture (Model → Controller → Routes)

## Tech Stack

**Backend**
- PHP 8+
- Laravel 11
- Eloquent ORM
- MySQL

**Frontend**
- React (Vite)
- Fetch API for HTTP requests

## Project Structure

```
task-manager-laravel-react/
├── backend/                # Laravel API source files
│   ├── app/
│   │   ├── Models/
│   │   │   └── Task.php
│   │   └── Http/Controllers/
│   │       └── TaskController.php
│   ├── database/migrations/
│   │   └── 2024_01_01_000000_create_tasks_table.php
│   └── routes/
│       └── api.php
├── frontend/                # React frontend source files
│   └── src/
│       ├── api.js
│       └── App.jsx
└── README.md
```

> Note: `backend/` and `frontend/` contain the custom application files only. They're meant to be copied into freshly scaffolded Laravel and Vite+React projects (see Setup below), which keep the full framework boilerplate out of this repo.

## API Endpoints

| Method | Endpoint          | Description                  |
|--------|-------------------|-------------------------------|
| GET    | `/api/tasks`      | List all tasks (supports `?status=` and `?priority=` filters) |
| GET    | `/api/tasks/{id}` | Get a single task            |
| POST   | `/api/tasks`      | Create a new task            |
| PUT    | `/api/tasks/{id}` | Update an existing task      |
| DELETE | `/api/tasks/{id}` | Delete a task                |

**Task fields:** `title` (required), `description`, `status` (`pending` \| `in_progress` \| `completed`), `priority` (`low` \| `medium` \| `high`), `due_date`

## Getting Started

### Prerequisites

- PHP 8.1+ and [Composer](https://getcomposer.org)
- MySQL Server
- Node.js and npm

### Backend Setup

1. Create a new Laravel project:
   ```bash
   composer create-project laravel/laravel task-manager-backend
   cd task-manager-backend
   ```
2. Enable API routing (Laravel 11+):
   ```bash
   php artisan install:api
   ```
3. Copy this repo's `backend/` files into the new project, overwriting the matching paths:
   - `app/Models/Task.php`
   - `app/Http/Controllers/TaskController.php`
   - `database/migrations/2024_01_01_000000_create_tasks_table.php`
   - `routes/api.php`
4. Create a MySQL database:
   ```sql
   CREATE DATABASE task_manager;
   ```
5. Configure `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=task_manager
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
6. Run migrations and start the server:
   ```bash
   php artisan migrate
   php artisan serve
   ```
   API is now live at `http://localhost:8000/api/tasks`.

### Frontend Setup

1. Scaffold a new React app:
   ```bash
   npm create vite@latest task-manager-frontend -- --template react
   cd task-manager-frontend
   npm install
   ```
2. Copy this repo's `frontend/src/api.js` and `frontend/src/App.jsx` into the new project's `src/` folder, overwriting the defaults.
3. Run it:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser (make sure the Laravel server from above is also running).

### Quick API Test

```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish resume","priority":"high","due_date":"2026-08-01"}'
```

## Roadmap / Possible Improvements

- [ ] Add user authentication (Laravel Sanctum)
- [ ] Add pagination for large task lists
- [ ] Add sorting by due date / priority
- [ ] Deploy backend and frontend (e.g., Railway/Render + Vercel)
- [ ] Add automated tests (PHPUnit for API, Vitest for frontend)

## License

This project is open source and available under the [MIT License](LICENSE).
