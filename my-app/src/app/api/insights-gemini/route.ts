import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a JustPaid AI bot that can provide insights about the user's business based on revenue and expense data. Your task is to generate positive and negative insights."
});

// Function to calculate total amounts for revenue and expense
function calculateTotals(dataArray: Array<{ amount: number }>) {
  return dataArray.reduce((total, item) => total + item.amount, 0);
}

export async function POST(request: Request) {
  try {
    const { revenuedata, expensedata } = await request.json();

    // Calculate totals for revenue and expense
    const totalRevenue = calculateTotals(revenuedata);
    const totalExpense = calculateTotals(expensedata);

    // Summarize the data in the prompt
    const prompt = `
    Analyze the following business data:

    - Total Revenue: $${totalRevenue}
    - Total Expense: $${totalExpense}
    - Revenue Data: ${JSON.stringify(revenuedata)}
    - Expense Data: ${JSON.stringify(expensedata)}

    Provide both positive and negative insights about the business's financial performance.
    For Positve insights in the reponse mention positive and then give the insight
    Same for Negative Insights and same for Recommendation insights. Give 3 insights for each positive negative and recommendation.
    `;

    // Generate insights from the AI
    const result = await model.generateContent([prompt]);
    const responseText = await result.response.text();

    // Post-process AI response into structured insights
    const aiInsights = categorizeInsights(responseText);

    return NextResponse.json({ insights: aiInsights });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}

// Function to categorize AI response into positive and negative insights
function categorizeInsights(text: string) {
    const insights = text.split("\n").filter(Boolean); // Split into individual insights
  
    return insights.map((insight) => {
      let icon, color;
  
      // Detect positive, negative, or neutral sentiment based on keywords
      if (
        insight.toLowerCase().includes("strong revenue") ||
        insight.toLowerCase().includes("high profit") ||
        insight.toLowerCase().includes("growth")
      ) {
        icon = "<ArrowUpIcon className='text-green-500' />";
        color = "text-green-500";
      } else if (
        insight.toLowerCase().includes("lack") ||
        insight.toLowerCase().includes("limited") ||
        insight.toLowerCase().includes("possible one-time revenue")
      ) {
        icon = "<ArrowDownIcon className='text-red-500' />";
        color = "text-red-500";
      } else {
        // Neutral or informational insights
        icon = "<InfoIcon className='text-blue-500' />";
        color = "text-blue-500";
      }
  
      return { text: insight, icon, color };
    });
  }
  
