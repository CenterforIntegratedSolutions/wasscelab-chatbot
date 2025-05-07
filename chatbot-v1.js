import openai from './config/config-openai.js';

// Use an object to store chat histories for each user
const userChatHistories = {};
console.log("chat histories:", userChatHistories)

// Function to get or initialize a user's chat history
function getUserChatHistory(userId) {
    if (!userChatHistories[userId]) {
        userChatHistories[userId] = []; // Initialize empty history if not present
    }
    return userChatHistories[userId];
}

async function chatbot(userInputData, userId) {
    try {
        // Get the user's chat history
        let chatHistory = getUserChatHistory(userId);

        // System message to define behavior
        const systemMessage = {
            role: 'system',
            content: `You are assisting the student with understanding the current exam problem. Focus only on the specific question being asked. Avoid discussing topics outside of this question. If the user's question deviates from the exam content, politely remind them to stay on topic.`
        };

        // Add system message at the start of the messages array
        const messages = [systemMessage, ...chatHistory];

        const chatBoxName = "WASSCElab Assistant";
        let userContent;

        if (userInputData.initializer == 1) {
            userContent = `As the '${chatBoxName},' you are to assist students with understanding how well they are doing on their exams. Please look at the questions, answer and user selected option and help them understand why their answer is incorrect or correct. Ensure your responses are concise, under 100 words, drawing from the curriculum and kindly gather more details. Here's the question: ${userInputData.question}. Here is the user's selected option: ${userInputData.selected}, and here is the correct option: ${userInputData.correct}.`;
            // Clear user's chat history for new questions
            userChatHistories[userId] = [];
        } else {
            userContent = userInputData.question;
            if (userContent.toLowerCase() === 'exit' || userContent.toLowerCase() === 'close') {
                return; // Stop processing if user asks to exit or close
            }
        }

        // Add latest user input to messages
        messages.push({ role: 'user', content: userContent });

        // Call the API with user input & history
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
        });

        // Get completion text/content
        const completionText = completion.choices[0].message.content;

        // Update chat history with user input and assistant response
        chatHistory.push({ role: 'user', content: userContent });
        chatHistory.push({ role: 'assistant', content: completionText });

        // Ensure history doesn't grow too large
        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(-20); // Keep only the last 20 exchanges
        }

        // Save the updated history back to the userChatHistories
        userChatHistories[userId] = chatHistory;

        const respond = {
            "user": userContent,
            "wasscelab_assistant": completionText
        };

        // Return the response
        return respond;

    } catch (error) {
        console.error('Error in chatbot:', error);
        return { error: 'Sorry, something went wrong. Please try again.' };
    }
}

export default chatbot;
