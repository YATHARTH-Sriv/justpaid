import { getEmbeddings, getPineconeClient } from "./embedding";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
) {
  try {
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("justpaid");
    const namespace = pineconeIndex.namespace("revenue");
    const queryResult = await namespace.query({
      topK:4,
      vector: embeddings,
      includeMetadata: true,
    });
    console.log("queryResult",queryResult)
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

// interface Metadata{
//   CurrentMonth: string;
//   amount: string;
//   category: string;
//   date: string;
//   description: string;
//   source: string;
//   type: string;
// }

// interface querydata{
//   id: string,
//   score:number,
//   values: [],
//   metadata: Metadata      
// }
export async function getContext(query: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings.data[0].embedding);
  const qualifieddata:any= [];

  // Use forEach or for loop instead of map
  matches.forEach((match) => {
    if (match && match.score && match.score >= 0.82) {
      qualifieddata.push(match.metadata);
    }
  });

  
  console.log("qualifyingData",qualifieddata)
  return qualifieddata;
  // 5 vector
}