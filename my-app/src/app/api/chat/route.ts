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
    model: openai('gpt-4-turbo'),
    messages: convertToCoreMessages(messages),
    tools: {
      // Server-side tool to fetch revenue information
      getuserrevenueinfo: {
        description: "Get the revenue information of the user's business through this tool",
        parameters: z.object({
          query: z.string().describe("The query to get the revenue information")
        }),
        execute: async ({ query }: { query: string }) => {
          try {
            const matches = await getContext(query);
            let revenuedata=""
            matches.forEach((match: { CurrentMonth: any; amount: any; category: any; date: any; description: any; source: any }) => {
              revenuedata += ` ${match.amount} ${match.description} `;
            });
            return revenuedata;
          } catch (error) {
            console.error("Error fetching revenue information:", error);
            return { error: "Unable to fetch revenue information" };
          }
        }
      },
      
      getcompanyrevenueInformation: {
        description: 'Retrieve revenue information of the company as per the company name given by the user',
        parameters: z.object({ company: z.string() }),
        execute: async ({ company }: { company: string }) => {
          try {
            // Fetch revenue info from the external API
            const response=await axios.get(`https://financialmodelingprep.com/api/v3/search?query=${company}&limit=10&exchange=NASDAQ&apikey=${process.env.FINANCIAL_DATA_API}`)
            // const data=response.data
            console.log("response",response.data)
            const refined=[]
            // this if condition is required for some examples like Apple and other comapnies which have same names
            if(response.data.length>1){
            const companyname= company.charAt(0).toUpperCase() + company.slice(1).toLowerCase();
            for (let i = 0; i < response.data.length; i++) {
            if(response.data[i].name.includes(`${companyname} `) ){
                console.log("company",response.data[i])
                refined.push(response.data[i])
            }
            }
    
            const res = await axios.get(
              `https://financialmodelingprep.com/api/v3/income-statement/${refined[0].symbol}?period=annual&apikey=${process.env.FINANCIAL_DATA_API}`
            );

            console.log(`Fetched revenue info for ${company}:`, res.data[0]);
            console.log("revenue",res.data[0].revenue)
            return res.data[0].revenue;
           }
            const res = await axios.get(
            `https://financialmodelingprep.com/api/v3/income-statement/${response.data[0].symbol}?period=annual&apikey=${process.env.FINANCIAL_DATA_API}`
          );

          console.log(`Fetched revenue info for ${company}:`, res.data[0]);
          console.log("revenue",res.data[0].revenue)
          return res.data[0].revenue;
          } catch (error) {
            console.error(`Failed to fetch revenue info for ${company}:`, error);
            return { error: `Unable to fetch revenue information for ${company}` };
          }
        }
      },
      
      getcompanyname: {
        description: 'Ask the user for the company name to get the revenue information.',
        parameters: z.object({
          companyname: z.string().describe('The name of the company')
        })
      }
    },
  });
  
  // Stream the response
  return result.toDataStreamResponse();
  
}
