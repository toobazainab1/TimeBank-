Time Bank — Skill Exchange Platform
Project Overview

Time Bank is a web-based skill exchange platform that allows users to trade skills instead of money. Users can offer their skills and request skills from others, earning and spending time credits. The platform promotes collaboration, community engagement, and knowledge sharing.

Features
User Features

Sign Up / Login: Secure authentication for users.

Profile Management: Add personal details, skills, and track earned time credits.

Skill Requests: Create requests for skills you need.

Skill Offers: List the skills you can provide.

Time Credit System: Earn time for helping others, spend time to get help.

Reviews & Ratings: Provide feedback for completed skill exchanges.

Referral System: Invite friends to join and earn bonus time credits.

Admin Features

User Management: View, approve, or deactivate user accounts.

Transaction Monitoring: Track time credit transactions and exchanges.

Skill Request Oversight: Ensure all requests are appropriate.

Reports: Generate reports of activity and transactions.

Super Admin Features

Full platform control, including admin account management and system configuration.

Tech Stack

Frontend: React.js, CSS, HTML

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Deployment: Netlify (frontend) / Heroku (backend) or Vercel

Version Control: Git & GitHub

Project Structure
time-bank/
│
├── backend/             # Node.js + Express server
│   ├── models/          # MongoDB schemas (User, Skill, Session, Review)
│   ├── routes/          # API routes for users, skills
│   └── index.js        # Entry point
│
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Home, Dashboard, Sign Up, Login, Profile
│   │   └── App.jsx      # Main React component
│   └── package.json
│
└── README.md

Installation & Setup
Backend

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start the server:

npm run dev

Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the React app:

npm start

Usage

Sign Up/Login to access the platform.

Add your skills and create requests.

Exchange skills with other users and earn/spend time credits.

Leave reviews after completing a skill exchange.


Future Enhancements

Real-time chat between users.

Mobile app version.

Real time Session conduction

AI-based skill recommendations.

Gamification features like badges and leaderboards.

