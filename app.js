const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

app.use('/api/articles', require('./routes/articles'));

app.get('/',(req,res) => {
  res.send('Welcome to the Personal Blogging Platform API');
})

app.get('/api/articles', (req,res) => {
  res.json()
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
