# 🎓 AI-Powered Learning Tutor for Rural Indian Students

An adaptive, culturally-relevant AI tutor designed specifically for rural Indian students (Grades 1-5). Features bilingual support (English/Hindi), offline capabilities, and personalized learning plans.

## ✨ Features

### 🧠 Adaptive Learning
- **AI-Powered Assessment**: Questions adapt based on student performance
- **Personalized Learning Plans**: Weekly schedules tailored to individual needs
- **Progress Tracking**: Detailed analytics on strengths and weaknesses
- **Difficulty Adaptation**: Automatically adjusts from beginner to advanced

### 🌏 Cultural Relevance
- **Rural Indian Context**: Examples using rupees, village markets, cricket, festivals
- **Bilingual Support**: Full English and Hindi (हिंदी) translations
- **Age-Appropriate**: Content designed for grades 1-5
- **Offline-Friendly**: Downloadable learning plans and resources

### 📚 Subject Coverage
**Mathematics:**
- Basic Operations (Addition, Subtraction, Multiplication)
- Fractions and Decimals
- Geometry and Mensuration
- Profit/Loss, Simple Interest
- Time, Money, and Measurement

**English:**
- Vocabulary Building
- Reading Comprehension
- Grammar Basics
- Creative Writing
- Story Analysis

### 🎯 Key Capabilities
- ✅ User Authentication (Signup/Login)
- ✅ Adaptive Question Generation
- ✅ Real-time Performance Evaluation
- ✅ Personalized Weekly Learning Plans
- ✅ Progress Tracking & Analytics
- ✅ Bilingual Interface (English/Hindi)
- ✅ Gamification (Points, Levels, Streaks)
- ✅ Offline Content Support

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Google Gemini AI** for content generation
- **bcryptjs** for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/learning-ai-tutor.git
cd learning-ai-tutor
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_API_KEY=your_google_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔑 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-tutor
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

### Getting API Keys
1. **MongoDB**: Get free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Google Gemini API**: Get key at [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📱 Usage

### For Students
1. **Sign Up**: Create an account with name, email, and password
2. **Start Assessment**: Choose your grade (1-5) and subject
3. **Answer Questions**: AI adapts difficulty based on your performance
4. **View Results**: See your score, strengths, and areas to improve
5. **Get Learning Plan**: Receive personalized weekly schedule
6. **Track Progress**: Monitor your streak, points, and level

### For Parents
- View child's progress and learning plan
- Download/print weekly schedules
- Access offline resources
- Monitor difficulty levels

## 🎨 Screenshots

### Home Dashboard
Beautiful, engaging interface with gamification elements

### Adaptive Assessment
Questions in both English and Hindi with cultural context

### Learning Plan
Personalized weekly schedule with daily activities

### Progress Tracking
Detailed analytics on student performance

## 🏗️ Project Structure

```
learning-ai-tutor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
│
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # AI service
│   ├── utils/            # Utility functions
│   └── server.js         # Express server
│
└── README.md
```

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Environment variable management
- Request validation

## 🌟 Future Enhancements

- [ ] Voice-to-text for questions
- [ ] Text-to-speech for Hindi support
- [ ] Mobile app (React Native)
- [ ] Parent dashboard
- [ ] Teacher portal
- [ ] More subjects (Science, Social Studies)
- [ ] Video lessons
- [ ] Peer learning features
- [ ] Offline mode with service workers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- MongoDB for database
- React and Vite for frontend framework
- All contributors and supporters

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

## 🎯 Mission

To provide quality, accessible, and culturally-relevant education to rural Indian students through AI-powered adaptive learning.

