# BlogSpace – Blog Platform

BlogSpace is a full-stack blogging platform where users can create, explore, edit, and share blog posts. Users can also interact with blog posts through comments.

## Features

- User registration and login
- Secure authentication using JWT
- Password encryption using bcrypt
- Create and publish blog posts
- Explore and read blogs
- Edit and delete your own blog posts
- Add and delete comments
- Personal dashboard to manage blogs
- Blog categories and tags
- Responsive user interface

## Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Axios
- React Router DOM
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```text
Blog-Platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Blog-Platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_platform
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/:id` | Get single blog |
| GET | `/api/blogs/my-blogs` | Get user's blogs |
| POST | `/api/blogs` | Create blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |
| GET | `/api/comments/:blogId` | Get comments |
| POST | `/api/comments/:blogId` | Add comment |
| DELETE | `/api/comments/:id` | Delete comment |

## Future Enhancements

- Blog likes and bookmarks
- User profile customization
- Image upload functionality
- Blog search and filtering improvements
- Admin dashboard

## Author

Developed as a Full-Stack Web Development Project.

---

**BlogSpace – Write. Share. Inspire.**