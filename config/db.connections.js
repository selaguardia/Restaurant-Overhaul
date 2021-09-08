const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/test';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[0m', `[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`); 
});

mongoose.connection.on('error', (error) => {
  console.log('\x1b[31m%s\x1b[0m', 'MongoDB connection error 😥', error);
});

mongoose.connection.on('disconnected', () => console.log('\x1b[33m%s\x1b[0m', 'MongoDB disconnected  ⚡️ 🔌 ⚡️'));