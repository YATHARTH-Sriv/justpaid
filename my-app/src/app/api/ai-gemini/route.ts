import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req:NextRequest){
const {message}=await req.json()
const model = genAI.getGenerativeModel(
    { 
    model: "gemini-1.5-flash" ,
    systemInstruction: "You are a Journalist AI chatbot now journalist ai is a tool to write blogs or stories , how it works is user gives an image or a title and then we use ai to generate content based on the title or image. As per the need of user suggest him to go with image functionality or tell user to give title so that we can generate a story. If the user says i want to give a title give this link in response http://localhost:3000/generate . if user says i want to give an image give this link in response http://localhost:3000/imagecontext"
   });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
let result = await chat.sendMessage(message);
console.log(result.response.text());
return NextResponse.json({ text: result.response.text() });
}