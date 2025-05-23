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
            content: `You are assisting a student in understanding their exam question and provide essay, especially why an answer is correct or incorrect and provide simplify essay question, if ask. Focus only on the specific question being asked. Avoid discussing topics outside of this question. If the user's question deviates from the exam content, politely remind them to stay on topic.
            
            If the provided "correct answer" appears to be incorrect or doesn't logically match the question, politely flag it by stating: "Note: The provided correct answer may not be accurate. Please report it."
            
            Then proceed to give your best explanation based on curriculum logic. Keep your feedback concise (under 100 words)`
        };



        // Add system message at the start of the messages array
        const messages = [systemMessage, ...chatHistory];

        const chatBoxName = "WASSCElab Assistant";
        let userContent;

        if (userInputData.initializer == 1) {
            userContent = `As the WASSCElab Assistant, your task is to help the me understand my exam question. Analyze the description, the question, the selected option, and the correct answer. Explain whether the I was right or wrong, and why. Keep your explanation clear and short (under 100 words), aligned with the WAEC curriculum, and encouraging. If the user's question deviates from the question content, avoid answering and politely remind them to stay on topic.
            Description: ${userInputData.description}
            Question: ${userInputData.question}
            Selected Answer: ${userInputData.selected}
            Correct Answer: ${userInputData.correct}`;



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
