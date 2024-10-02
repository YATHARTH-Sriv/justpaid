import { OpenAIApi, Configuration } from "openai-edge";
import { Pinecone } from '@pinecone-database/pinecone';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

interface EmbedData {
  amount?: any;
  date?: any;
  source?: any;
  category?: any;
  description?: any;
  invoiceId?: any;
  useremail?: string;
  CurrentMonth?: any;
  userQuestion?: string; // Add this for user questions
}

export async function getEmbeddings(data: EmbedData | string ) {
  try {
    let inputText = '';

    // Check if the input is an object (structured data) or a user question (string)
    if (typeof data === 'string') {
      inputText = `User question: ${data}`;
    } else {
      inputText = `Revenue data: ${data.amount} ${data.date} ${data.source} ${data.category} ${data.description} ${data.invoiceId} ${data.useremail} ${data.CurrentMonth}`;
    }

    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: inputText,
    });

    console.log("Response from OpenAI:", response);
    const result = await response.json();
    console.log("Result from OpenAI:", result);
    return result;

  } catch (error) {
    console.log("Error calling OpenAI embeddings API:", error);
    throw error;
  }
}




export const getPineconeClient = () => {
    return new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
    });
  };

export async function loadIntoPinecone(embed:number[],nameofspace:string,invoiceno:number,data:EmbedData) {
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("justpaid");
    const namespace = pineconeIndex.namespace(nameofspace);
  
    console.log("inserting vectors into pinecone");
    const insertinginpinecone=await namespace.upsert([
            {
               id: invoiceno.toString(), 
               values: embed,
               metadata: { 
                type: 'revenue' ,
                amount: data.amount,
                date: data.date,
                source: data.source,
                category: data.category,
                description: data.description,
                CurrentMonth: data.CurrentMonth
              }
            },
    ]);
    
    return insertinginpinecone
}