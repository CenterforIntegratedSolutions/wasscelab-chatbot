# WASSCELab Chatbot API

This API assists students by answering questions and providing insights for exam preparation. Using OpenAI's language models, it provides accurate and focused responses to each question.

## Setup

### Prerequisites
1. **Node.js** - Install [Node.js](https://nodejs.org/).
2. **Environment Variables** - Create a `.env` file in the project root to store sensitive information.

### Installation
1. Open the project in your code editor.
2. In the terminal, run:

   ```bash
   npm install cors dotenv colors express openai readline-sync
   ```

### Starting the Server
To start the server, run:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

### Environment Variables
Add an OpenAI API key to your `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

Replace `your_openai_api_key` with your actual OpenAI API key.

## Usage

### Interacting with the Chatbot

- **URL**: `http://localhost:3000/chatbot`
- **Method**: `POST`

**Request Example**:

```json
{
  "userId": "unique_user_id",
  "message": {
    "question": "What is Science?",
    "selected": "Your answer",
    "correct": "Correct answer from answer key",
    "initializer": 1
  }
}
```

**Response Example**:

```json
{
  "chatHistory": {
    "user": "What is Science?",
    "wasscelab_assistant": "Science is a systematic study of the physical and natural world through observation and experimentation."
  }
}
```

### Fields
- **userId**: Unique ID for tracking each user’s session.
- **message.question**: Question for the chatbot.
- **message.selected**: User’s answer, for context.
- **message.correct**: Correct answer, for feedback.
- **message.initializer**: Set to `1` for new conversations, `0` for ongoing.

---

## Troubleshooting

1. **CORS Issues**: Ensure CORS is correctly configured.
2. **API Key**: Verify the OpenAI API key in the `.env` file.
