# Job Portal - React + Vite Application

A modern, full-featured job application portal built with React, Vite, and Tailwind CSS. This application features a clean component-based architecture with separate files for better maintainability.

## ✨ Features

### 👤 User Features
- ✅ User Registration & Login
- ✅ Complete Profile Management (Name, Phone, Location, Skills, Experience, Resume)
- ✅ Job Search with Real-time Filtering
- ✅ View Detailed Job Descriptions
- ✅ Apply for Jobs (One-click application)
- ✅ Withdraw Applications
- ✅ Track Application Status
- ✅ User Dashboard with Statistics
- ✅ Duplicate Application Prevention

### 👨‍💼 Admin Features
- ✅ Admin Login
- ✅ User Management (View, Update, Block/Unblock)
- ✅ Job Management (Add/Remove Jobs)
- ✅ Application Monitoring
- ✅ Prevent Fake/Duplicate Applications
- ✅ Activity Dashboard with Analytics
- ✅ View User Details

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-first CSS Framework
- **Lucide React** - Beautiful Icon Library
- **LocalStorage** - Client-side Data Persistence

## 📁 Project Structure

```
job-portal-vite/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Alert.jsx        # Alert/notification component
│   │   └── Navbar.jsx       # Navigation bar component
│   ├── pages/               # Page components
│   │   ├── Landing.jsx      # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── Profile.jsx      # User profile page
│   │   ├── SearchJobs.jsx   # Job search page
│   │   ├── MyApplications.jsx    # User applications page
│   │   ├── UserDashboard.jsx     # User dashboard
│   │   └── AdminDashboard.jsx    # Admin dashboard
│   ├── utils/               # Utility functions
│   │   ├── data.js          # Initial data
│   │   └── storage.js       # LocalStorage utilities
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Extract the zip file**

2. **Navigate to the project directory:**
   ```bash
   cd job-portal-vite
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Demo Credentials

### User Account
- **Email:** user@example.com
- **Password:** user123

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123

## 📖 Component Overview

### Components (`/src/components/`)

- **Alert.jsx** - Displays success/error notifications
- **Navbar.jsx** - Responsive navigation bar with user/admin menus

### Pages (`/src/pages/`)

- **Landing.jsx** - Home page with job listings preview
- **Login.jsx** - User/Admin login form
- **Register.jsx** - User registration form
- **Profile.jsx** - User profile management
- **SearchJobs.jsx** - Job search with filters and detail modal
- **MyApplications.jsx** - View and manage job applications
- **UserDashboard.jsx** - User statistics and quick actions
- **AdminDashboard.jsx** - Admin panel with 4 sections:
  - Overview (Statistics)
  - User Management
  - Job Management
  - Application Monitoring

### Utilities (`/src/utils/`)

- **data.js** - Initial sample data (jobs, users)
- **storage.js** - LocalStorage helper functions

## 💡 Features in Detail

### For Job Seekers
1. **Register/Login** - Create an account or sign in
2. **Complete Profile** - Add your professional details
3. **Search Jobs** - Filter by title, company, or location
4. **Apply** - One-click application with your saved profile
5. **Track** - Monitor all your applications with status updates
6. **Withdraw** - Cancel applications before they're processed

### For Admins
1. **Dashboard** - Overview of users, jobs, and applications
2. **User Management** - View detailed user profiles and block suspicious accounts
3. **Job Posting** - Add new job listings with full details
4. **Monitor Activity** - Track all application activity in real-time
5. **Security** - Prevent duplicate applications and block fake users

## 🎨 Customization

### Colors
The application uses a gradient color scheme (indigo to purple). To change:

1. Edit the gradient classes in component files:
   ```jsx
   // Find and replace:
   from-indigo-600 to-purple-600
   // With your preferred colors
   ```

2. Or modify the Tailwind config:
   ```js
   // tailwind.config.js
   theme: {
     extend: {
       colors: {
         primary: '#your-color',
       }
     }
   }
   ```

### Styling
- All styles use Tailwind CSS utility classes
- Custom animations are defined in `index.css`
- Modify `tailwind.config.js` to extend the theme

## 💾 Data Persistence

All data is stored in the browser's localStorage:
- User accounts and profiles
- Job listings
- Applications

To reset the application:
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

## 🐛 Known Issues & Solutions

**Issue:** Jobs not appearing after refresh
**Solution:** Check browser console for localStorage errors, clear cache if needed

**Issue:** Application not submitting
**Solution:** Ensure profile is completed before applying

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite for the blazing-fast dev server
- Tailwind CSS for the utility classes
- Lucide for the beautiful icons

---

**Built with ❤️ using React + Vite**

For issues or questions, please create an issue in the project repository.
