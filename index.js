const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = 8080;
const mongoURI = 'mongodb+srv://vkvikashkumar987:vkvikashkumar987@cluster0.ncpjepi.mongodb.net/LearnQ'; // Change this if your MongoDB server is running on a different URI

app.use(cors({
     origin: '*',
     credentials: true,
}));

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
})
     .then(() => {
          console.log('Connected to MongoDB');
     })
     .catch((err) => {
          console.error('Error connecting to MongoDB:', err.message);
     });



// Define route to get all questions
app.get('/questions', async (req, res) => {
     try {
          const db = mongoose.connection.db;
          const questions = await db.collection('question').find({}).toArray();
          res.json(questions);
     } catch (err) {
          console.error('Error fetching questions:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
     }
});

// Start the server
app.listen(port, () => {
     console.log(`Server is listening on port ${port}`);
});
