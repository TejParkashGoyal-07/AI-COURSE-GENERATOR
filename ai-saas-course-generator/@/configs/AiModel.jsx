/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const GenerateCourseLayout_AI= model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
            role: "user",
            parts: [
                { text: "Create A Course On The Following Details with field Course Name,Description,along with Chapter Name,about,Duration:Category:\"Programming\",Topic:Python,Level:Basic,Duration:1hours,NoOfChapters:5,in Json Format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"CourseName\": \"Python Programming for Beginners\",\n  \"Description\": \"This course introduces the fundamental concepts of Python programming, designed for absolute beginners with no prior coding experience. You'll learn the basics of syntax, data types, variables, operators, control flow, and functions, laying a strong foundation for further exploration in Python.\",\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Introduction to Python\",\n      \"About\": \"Learn about Python's history, its popularity, and why it's a great choice for beginners. We'll also cover how to set up your Python environment.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Basic Syntax and Data Types\",\n      \"About\": \"Dive into the core syntax of Python, including variables, data types (integers, floats, strings, booleans), and basic operations.\",\n      \"Duration\": \"25 minutes\"\n    },\n    {\n      \"ChapterName\": \"Control Flow: Making Decisions\",\n      \"About\": \"Explore conditional statements (if, else, elif) and loops (for, while) to create programs that can make decisions and repeat tasks.\",\n      \"Duration\": \"20 minutes\"\n    },\n    {\n      \"ChapterName\": \"Functions: Reusable Code Blocks\",\n      \"About\": \"Learn to define your own functions to organize code and make it more efficient.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Putting it Together: Simple Projects\",\n      \"About\": \"Apply your newfound knowledge by building small Python programs to solidify your understanding.\",\n      \"Duration\": \"15 minutes\"\n    }\n  ],\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"1 hour\",\n  \"NoOfChapters\": 5\n}\n```\n" },
            ],
        },
    ],
});


