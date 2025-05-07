import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chatbot from './chatbot.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());
app.use(cors());

// Route to interact with the chatbot
app.post('/chatbot', async (req, res) => {

  // Extract the user's message and userId from the request body
  const { message: userInputData, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  console.log(`User Response: ${userId} | ${userInputData?.description} | ${userInputData?.question}`);

  try {
    // Call the chatbot function with the user's input and userId
    const response = await chatbot(userInputData, userId);

    // Respond with the updated chat history
    res.json({ success: true, data: response });
  } catch (error) {

    // If an error occurs, respond with a 500 status code and the error message
    console.error('Error in chatbot:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
