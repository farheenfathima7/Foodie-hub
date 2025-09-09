const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://feehafathima05_db_user:juhdTJbT4eDFLeEQ@foodiehub.05hajqk.mongodb.net/foodiehub?retryWrites=true&w=majority&appName=foodiehub';

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
