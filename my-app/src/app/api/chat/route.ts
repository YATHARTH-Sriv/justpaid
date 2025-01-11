import { getContext } from '@/lib/context';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import axios from 'axios';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToCoreMessages(messages),
    tools: {
      // Tool to fetch user revenue information
      getuserrevenueinfo: {
        description: "Get the revenue information of the user's business without asking for the company name, as data is fetched directly from the database.",
        parameters: z.object({
          query: z.string().describe("The query to get the user's business revenue information"),
        }),
        execute: async ({ query }: { query: string }) => {
          try {
            const matches = await getContext(query);
            let revenueData = "";
            matches.forEach((match: { amount: any; description: any }) => {
              revenueData += `Amount: ${match.amount}, Description: ${match.description}\n`;
            });
            return revenueData || "No revenue data found for the given query.";
          } catch (error) {
            console.error("Error fetching revenue information:", error);
            return { error: "Unable to fetch revenue information." };
          }
        },
      },

      // Enhanced tool to fetch financial information about a company
      getcompanyrevenueInformation: {
        description: 'Retrieve detailed financial information (revenue, expenses, profit, etc.) about a specific company based on its name.',
        parameters: z.object({
          company: z.string().describe('The name of the company'),
          infoType: z
            .string()
            .optional()
            .describe('The type of financial information to retrieve, e.g., revenue, expenses, profit'),
        }),
        execute: async ({ company, infoType }: { company: string; infoType?: string }) => {
          try {
            const searchResponse = await axios.get(
              `https://financialmodelingprep.com/api/v3/search?query=${company}&limit=10&exchange=NASDAQ&apikey=${process.env.FINANCIAL_DATA_API}`
            );

            if (!searchResponse.data.length) {
              return `No data found for company: ${company}`;
            }

            const matchingCompany = searchResponse.data.find((c: { name: string }) =>
              c.name.toLowerCase().includes(company.toLowerCase())
            );

            if (!matchingCompany) {
              return `No exact match found for company: ${company}`;
            }

            const incomeResponse = await axios.get(
              `https://financialmodelingprep.com/api/v3/income-statement/${matchingCompany.symbol}?period=annual&apikey=${process.env.FINANCIAL_DATA_API}`
            );

            if (!incomeResponse.data.length) {
              return `No financial data available for company: ${company}`;
            }

            const financialData = incomeResponse.data[0];

            switch (infoType?.toLowerCase()) {
              case 'revenue':
                return `The revenue for ${company} is $${financialData.revenue.toLocaleString()}.`;
              case 'expenses':
                return `The total expenses for ${company} are $${financialData.costAndExpenses.toLocaleString()}.`;
              case 'profit':
                return `The net profit for ${company} is $${financialData.netIncome.toLocaleString()}.`;
              default:
                return `For ${company}, revenue: $${financialData.revenue.toLocaleString()}, expenses: $${financialData.costAndExpenses.toLocaleString()}, profit: $${financialData.netIncome.toLocaleString()}.`;
            }
          } catch (error) {
            console.error(`Error fetching financial info for ${company}:`, error);
            return { error: `Unable to fetch financial information for ${company}` };
          }
        },
      },

      // Tool to ask the user for the company name
      getcompanyname: {
        description: 'Ask the user for the company name to retrieve revenue information.',
        parameters: z.object({
          companyname: z.string().describe('The name of the company'),
        }),
      },
    },
  });

  // Stream the response
  return result.toDataStreamResponse();
}
