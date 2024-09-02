// chatbot.js

import openai from './config/config-openai.js';

let chatHistory = []; // Store conversation history
let userContent = "";

async function chatbot(userInputData) {
    try {

        // Construct messages by iterating over the history
        const messages = chatHistory.map(([role, content]) => ({
            role,
            content,
        }));

        const chatBoxName = "WASSCElab Assistant";

        if (userInputData.initializer == 1) {
            userContent = `As the '${chatBoxName},' you are to assist students with understanding how well they are doing on their exams. Please look at the questions, answer and user response and help them understand why their answer is incorrect. ensure your responses are concise, under 100 words, drawing from the curriculum and kindly gather more details.  Here's the question: ${userInputData.question}. Here is the user's response: ${userInputData.selected}  and here is the correct response: ${userInputData.correct}`;
            chatHistory = [];
        } else {
            userContent = userInputData.question;
            if (userContent.toLowerCase() === 'exit' || userContent.toLowerCase() === 'close') {
                return;
            }
        }
        
        // Add latest user input
        messages.push({ role: 'user', content: userContent });

        // Call the API with user input & history
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',//'gpt-3.5-turbo',
            messages: messages,
        });

        // Get completion text/content
        const completionText = completion.choices[0].message.content;

        
        // Update history with user input and assistant response
        chatHistory.push(['user', userContent]);
        chatHistory.push(['assistant', completionText]);

        const respond = {
            "user": userContent,
            "wasscelab_assistant": completionText
        }

        // Return chat
        return respond;
    } catch (error) {
        throw new Error(error);
    }
}

export default chatbot;
