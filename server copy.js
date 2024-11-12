// Import necessary modules
import express from 'express';
import cors from 'cors'; // Import the CORS middleware
import bodyParser from 'body-parser';
import chatbot from './chatbot.js';
// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000; // Define the port number

// Middleware to parse JSON request body
app.use(bodyParser.json());
// Use the CORS middleware to allow requests from all origins
/*const allowedOrigins = [
  'http://www.dev.mywasscelab.com', 
  'https://www.dev.mywasscelab.com', 
  'http://dev.mywasscelab.com', 
  'https://dev.mywasscelab.com', 
  'http://mywasscelab.com', 
  'https://mywasscelab.com', 
  'www.dev.mywasscelab.com',
  'http://127.0.0.1'
];*/

// Use the CORS middleware to allow requests from the specified origins
// Configure CORS with custom origin validation
/*const corsOptions = {
    origin: function (origin, callback) {
      // Check if the request origin is in the allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Deny the request
      }
    }
  };*/

// Enable CORS with custom options
app.use(cors());

// Route to interact with the chatbot
app.post('/chatbot', async (req, res) => {

  // Extract the user's message from the request body
  const userInputData = req.body.message;

  console.log(`Chatbot Initiated: ${userInputData.question}`)

  try {
    // Call the chatbot function with the user's input
    const chatHistory = await chatbot(userInputData);
    // Respond with the updated chat history
    res.json({ chatHistory });
  } catch (error) {
    // If an error occurs, respond with a 500 status code and the error message
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// lt --port 3000 --subdomain wssscelabai
// https://loca.lt/mytunnelpassword