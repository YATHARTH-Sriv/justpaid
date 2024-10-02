import dbconnect from "@/lib/db/connect";
import RevenueModel from "@/lib/db/model/revenue.model";
import { getEmbeddings, loadIntoPinecone } from "@/lib/embedding";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbconnect()
    try {
        const cookieStore = cookies();
        const userCookie = cookieStore.get('email');
        console.log(userCookie)
        const email=userCookie?.value.replaceAll('%40','@')
        const {amount,date,source,category,description,invoiceID,currentmonth}=await req.json()
        // const currentmonth="July"
        const revenue=await RevenueModel.create({
            amount: amount,
            date: date,
            source: source,
            category: category,
            description: description,
            invoiceId: invoiceID,
            useremail: email,
            CurrentMonth: currentmonth
        })
        const data={
            amount: amount,
            date: date,
            source: source,
            category: category,
            description: description,
            invoiceId: invoiceID,
            useremail: email,
            CurrentMonth: currentmonth
        }
        const res=await getEmbeddings(data)
    // console.log("embed",res.data[0].embedding)
        const fromuplaoding=await loadIntoPinecone(res.data[0].embedding,"revenue",Date.now(),data)
        console.log("fromuplaoding",fromuplaoding)
        return NextResponse.json(revenue,{status:201})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}

