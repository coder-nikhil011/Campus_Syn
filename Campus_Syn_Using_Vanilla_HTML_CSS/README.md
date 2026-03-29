# 🎓 Campus_Syn — Campus Management System

A full-stack campus management platform with four role-based dashboards.

---

## 📁 Project Structure

```
campus_syn/
├── backend/              # Node.js + Express + MongoDB API
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route handlers
│   ├── middleware/        # JWT auth middleware
│   ├── uploads/          # Event poster uploads (auto-created)
│   ├── server.js         # App entry point
│   ├── .env.example      # Environment variables template
│   └── package.json
└── frontend/             # Vanilla HTML/CSS/JS
    ├── css/style.css
    ├── js/
    │   ├── api.js        # Fetch utility
    │   ├── auth.js       # Login/logout
    │   ├── student.js    # Student dashboard
    │   ├── teacher.js    # Teacher dashboard
    │   ├── organizer.js  # Organizer dashboard
    │   ├── admin.js      # Admin panel
    │   └── app.js        # Router + helpers
    └── index.html
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

---

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus_syn
JWT_SECRET=your_strong_secret_here
JWT_EXPIRE=7d
```

Start the server:
```bash
npm run dev       # development (nodemon)
# or
npm start         # production
```

Server runs at: `http://localhost:5000`

---

### 2. Frontend Setup

No build step needed — just open the HTML file.

**Option A: Open directly**
```bash
open frontend/index.html
```

**Option B: Serve with a simple server (recommended)**
```bash
npx serve frontend
# or
cd frontend && python3 -m http.server 3000
```

Frontend runs at: `http://localhost:3000`

---

### 3. Create Your First Admin Account

Use the register endpoint (once, for setup):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "ADMIN001",
    "name": "System Admin",
    "password": "admin123",
    "role": "admin"
  }'
```

Then log in at the frontend with `ADMIN001` / `admin123`.

---

### 4. Add Users via Admin Panel

Once logged in as admin:
1. Go to **Add User** in the sidebar
2. Create student, teacher, and organizer accounts
3. Share their UIDs and passwords with them

---

## 👥 Roles & Features

| Role | Login | Features |
|------|-------|----------|
| **Student** | UID + password | View assignments, submit work, see events |
| **Teacher** | UID + password | Create assignments, track submissions |
| **Organizer** | UID + password | Post events with posters, manage events |
| **Admin** | UID + password | Manage all users, view all data |

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login (all roles) |
| POST | `/api/auth/register` | Register (setup only) |
| GET | `/api/auth/me` | Get current user |

### Assignments
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/assignments` | All logged-in users |
| POST | `/api/assignments` | Teacher only |
| PUT | `/api/assignments/:id/submit` | Student only |
| DELETE | `/api/assignments/:id` | Teacher only |

### Events
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/events` | All logged-in users |
| POST | `/api/events` | Organizer only |
| DELETE | `/api/events/:id` | Organizer only |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/users` | All users (filter by role) |
| POST | `/api/admin/users` | Create user |
| PUT | `/api/admin/users/:id/toggle` | Activate/deactivate |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/assignments` | All assignments |
| GET | `/api/admin/events` | All events |

---

## 📦 Tech Stack

- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs, Multer
- **Database:** MongoDB
- **Frontend:** Vanilla HTML/CSS/JS (no framework)
- **Fonts:** EB Garamond, DM Sans, JetBrains Mono

---

## 🔒 Security Notes

- Change `JWT_SECRET` in `.env` before deploying
- The `/api/auth/register` endpoint should be disabled or protected in production
- Passwords are hashed with bcrypt (salt rounds: 12)
- All dashboard routes require a valid JWT token