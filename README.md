# Sanchit's Portfolio Project

A modern, full-stack portfolio website built with Next.js, React, and Node.js. Features a beautiful UI with 3D particle effects, blog system, and comprehensive project showcase.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **3D Particle Background**: Interactive particle system using Three.js
- **Blog System**: Create, edit, and manage blog posts
- **Project Showcase**: Display portfolio projects with detailed information
- **Authentication**: User login/registration system
- **Contact Form**: Integrated contact form with spam protection
- **Dark Mode**: Theme switching capability
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **Radix UI** - Accessible component primitives

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

## 📁 Project Structure

```
Portfolio/
├── app/                    # Next.js app directory
│   ├── create-post/       # Blog post creation
│   ├── login/            # Authentication
│   ├── posts/            # Blog posts
│   ├── profile/          # User profile
│   └── globals.css       # Global styles
├── backend/               # Backend API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── scripts/      # Database seeding
│   └── server.js         # Main server file
├── components/            # Reusable components
│   ├── ui/               # UI components (Radix UI)
│   └── ...               # Custom components
└── frontend/             # Alternative frontend structure
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB 6+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   pnpm install
   
   # Install backend dependencies
   cd backend
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example
   cp backend/env.example backend/.env
   
   # Edit .env file with your configuration
   nano backend/.env
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if not running)
   mongod
   
   # Seed the database
   cd backend
   pnpm run seed
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1: Start backend
   cd backend
   pnpm run dev
   
   # Terminal 2: Start frontend
   pnpm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sanchit-portfolio

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Database Models

- **User**: Authentication and user profiles
- **Project**: Portfolio projects with detailed information
- **Contact**: Contact form submissions
- **Post**: Blog posts (if using blog system)

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (authenticated)
- `PUT /api/projects/:id` - Update project (authenticated)
- `DELETE /api/projects/:id` - Delete project (authenticated)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id` - Update contact status (admin)

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize component styles in individual component files

### Components
- UI components are in `components/ui/`
- Custom components are in `components/`
- Add new components following the existing pattern

### Backend
- Add new models in `backend/src/models/`
- Create new routes in `backend/src/routes/`
- Implement middleware in `backend/src/middleware/`

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build the project
pnpm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Render)
```bash
# Set production environment variables
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri

# Deploy using your platform's CLI
```

## 🧪 Testing

```bash
# Run linting
pnpm run lint

# Run type checking
pnpm run type-check

# Test backend API
cd backend
pnpm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you have any questions or need help:

- Create an issue in the repository
- Contact: [your-email@example.com]
- Portfolio: [your-portfolio-url]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Three.js](https://threejs.org/) - 3D graphics library
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web framework

---

Made with ❤️ by Sanchit
