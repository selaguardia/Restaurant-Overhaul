const mongoose = require('mongoose');

require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[0m', `[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`); 
});

mongoose.connection.on('error', (error) => {
  console.log('\x1b[31m%s\x1b[0m', 'MongoDB connection error 😥', error);
});

mongoose.connection.on('disconnected', () => console.log('\x1b[33m%s\x1b[0m', 'MongoDB disconnected  ⚡️ 🔌 ⚡️'));

