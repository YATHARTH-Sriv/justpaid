import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

function calculateTotals(dataArray: Array<{ amount: number }>) {
  return dataArray.reduce((total, item) => total + item.amount, 0);
}
export async function POST(req:NextRequest){
const {message,sale,revenue,expenses}=await req.json()
const totalRevenue = calculateTotals(revenue);
const totalExpense = calculateTotals(expenses);
console.log("message",sale)
const model = genAI.getGenerativeModel(
    { 
    model: "gemini-1.5-flash" ,
    systemInstruction: `Analyze the following business data: - Total Revenue: $${totalRevenue}
    - Total Expense: $${totalExpense}
    - Revenue Data: ${JSON.stringify(revenue)}
    - Expense Data: ${JSON.stringify(expenses)}
    
    Now You are a Just Paid AI bot that can provide insights about the user's business based on revenue and expense data. Your task is to analyse questions of user to answer about revenue expenses how to grow thier buisness ask thier domain of buisness and understand the category of buisness and tell them about some other companies in the same domain or category and talk about thier revenue as per public data vs how they are growing as per the data you have s .`
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