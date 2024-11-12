// chatbot.js

import openai from './config/config-openai.js';

let chatHistory = []; // Store conversation history
let userContent = "";

async function chatbot(userInputData) {
    try {

        console.log("got to chat bot")
        // Construct messages by iterating over the history
        /* const messages = chatHistory.map(([role, content]) => ({
             role,
             content,
         }));*/

        // System message to define behavior
        const systemMessage = {
            role: 'system',
            content: `You are assisting the student with understanding the current exam problem. Focus only on the specific question being asked. Avoid discussing topics outside of this question. If the user's question deviates from the exam content, politely remind them to stay on topic.`
        };

        // Add system message at the start of the messages array
        const messages = [systemMessage, ...chatHistory.map(([role, content]) => ({
            role,
            content,
        }))];

        const chatBoxName = "WASSCElab Assistant";

        if (userInputData.initializer == 1) {
            userContent = `As the '${chatBoxName},' you are to assist students with understanding how well they are doing on their exams. Please look at the questions, answer and user response and help them understand why their answer is incorrect or correct. ensure your responses are concise, under 100 words, drawing from the curriculum and kindly gather more details.  Here's the question: ${userInputData.question}. Here is the user's response: ${userInputData.selected}  and here is the correct response: ${userInputData.correct}`;
            chatHistory = [];
        } else {
            userContent = userInputData.question;
            if (userContent.toLowerCase() === 'exit' || userContent.toLowerCase() === 'close') {
                return;
            }
        }
        console.log("got to chat bot2")
        // Add latest user input
        messages.push({ role: 'user', content: userContent });

        // Call the API with user input & history
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',//'gpt-3.5-turbo',
            messages: messages,
        });

        // Get completion text/content
        const completionText = completion.choices[0].message.content;

        console.log("response: ", completionText)
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
