import dbconnect from "@/lib/db/connect";
import RevenueModel from "@/lib/db/model/revenue.model";
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
        return NextResponse.json(revenue,{status:201})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}