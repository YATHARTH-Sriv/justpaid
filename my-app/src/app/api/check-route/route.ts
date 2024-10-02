// import { getContext, getMatchesFromEmbeddings } from "@/lib/context";
// import { getEmbeddings } from "@/lib/embedding"
// import axios from "axios";
// import { NextResponse } from "next/server";

import { NextResponse } from "next/server";

// interface company{
//         symbol: string,
//         name: string,
//         currency: string,
//         stockExchange: string,
//         exchangeShortName: string
// }

export async function POST(){
    return NextResponse.json({message:"Hello World"})
}
//     try {
//         // const textquery="what is my revenue details in month of august"
//         // // const res=await getEmbeddings(textquery)
//         // // const matches = await getMatchesFromEmbeddings(res.data[0].embedding);
//         // // console.log("final res",matches)
//         // const res=await axios.get("https://financialmodelingprep.com/api/v3/search?query=APPLE&limit=10&exchange=NASDAQ&apikey=")
//         // // const matches=await getContext(textquery)
//         // const data=res.data
//         // // const refined=data.foreach((company:company)=>{
//         // //      if((company.name).includes("APPLE")){
//         // //          console.log("company",company)s
//         // //      }
//         // // })
//         // const refined=[]
//         // for (let i = 0; i < data.length; i++) {
//         //     if(data[i].name.includes("Apple ") ){
//         //         console.log("company",data[i])
//         //         refined.push(data[i])
//         //     }
//         // }
//         // // const refined = data.filter((company: company) => {
//         // //     return company.name.includes("APPLE ") && company.currency.includes("USD") && company.exchangeShortName.includes("NASDAQ")
//         // // });
//         // console.log("refined",refined)
//         // return NextResponse.json(refined[0],{status:200})
//         const response=await axios.get(`https://financialmodelingprep.com/api/v3/search?query=APPLE&limit=10&exchange=NASDAQ&apikey=`)
//         // const data=response.data
//         const refined=[]
//         for (let i = 0; i < response.data.length; i++) {
//         if(response.data[i].name.includes(`Apple `) ){
//             console.log("company",response.data[i])
//             refined.push(response.data[i])
//         }
//         }

//         const res = await axios.get(
//           `https://financialmodelingprep.com/api/v3/income-statement/${refined[0].symbol}?period=annual&apikey=${process.env.FINANCIAL_DATA_API}`
//         );
//         console.log(`Fetched revenue info for Apple:`, res.data[0]);
//         return NextResponse.json(res.data[0].revenue);
//     } catch (error) {
//         return NextResponse.json({error},{status:500})
//     }
// }