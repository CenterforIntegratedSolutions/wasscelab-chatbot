# AI CHATBOT API

## Usage Instructions

To use the ChatBot API Server, follow these instructions:

1. Install the following Node.js packages:
   - cors: A middleware for enabling CORS (Cross-Origin Resource Sharing) with various options.
   - dotenv: A module for loading environment variables from a .env file into process.env.
   - colors: A library for adding color and style to Node.js console output.
   - express: A web application framework for Node.js, designed for building web applications and APIs.
   - openai: Provides an API for accessing various natural language processing models, including GPT.
   - readline-sync: A synchronous user input library for Node.js.

   Open the ChatBot API Server folder in VS Code and run the following command in the VS Code terminal to install all necessary packages:

`npm install cors dotenv colors express openai readline-sync`

2. After the installation is complete, start the server by running the following command:

`npm start`

This will start the server on port 3000. For example, the server will be accessible at http://localhost:3000/.

3. Interact with the chatbot using the following URL:
- Example: http://localhost:3000/chat

Send a POST request with the message to the chatbot in the following format:

`{
"message": "what is Science"
}`

4. Receive the chatbot's response in the following format:

`{
"chatHistory": {
"user": "what is Science",
"wasscelab_assistant": "Science is a systematic study of the structure and behavior of the physical and natural world through observation and experimentation. It seeks to understand and explain the underlying principles that govern the universe, from the smallest particles to the largest galaxies. Science encompasses various fields such as biology, chemistry, physics, astronomy, and geology, among others. It is a way of exploring and discovering the world around us while maintaining a commitment to objectivity, evidence-based reasoning, and the pursuit of truth."
}
}`
