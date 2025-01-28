const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const ProjectRoutes = require('./routes/projectRoute')
const suggestionRoutes =require('./routes/suggestionRoute')
require('dotenv').config();
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Database Connected');
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://storycraft-frontend.onrender.com',
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);
app.use('/project', ProjectRoutes);
app.use('/suggestion',suggestionRoutes)

// Start server using 'server' instead of 'app'
app.listen(process.env.PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});

