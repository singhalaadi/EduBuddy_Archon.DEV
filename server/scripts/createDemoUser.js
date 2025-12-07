const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createDemoUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if demo user exists
    let demoUser = await User.findOne({ email: 'demo@edubuddy.com' });
    
    if (demoUser) {
      console.log('Demo user already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123', salt);

    // Create demo user with sample data
    demoUser = new User({
      name: 'Demo User',
      email: 'demo@edubuddy.com',
      password: hashedPassword,
      learningProfile: {
        learningStyle: 'visual',
        preferredDifficulty: 'intermediate',
        interests: ['mathematics', 'science', 'programming'],
        goals: ['Learn coding', 'Improve math skills']
      },
      points: 500,
      level: 5,
      badges: ['early-bird', 'quick-learner', 'consistent-student']
    });

    await demoUser.save();
    console.log('Demo user created successfully!');
    console.log('Email: demo@edubuddy.com');
    console.log('Password: demo123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating demo user:', error);
    process.exit(1);
  }
};

createDemoUser();
