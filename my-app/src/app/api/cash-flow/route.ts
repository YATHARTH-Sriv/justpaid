import dbconnect from "@/lib/db/connect";
import CashflowModel from "@/lib/db/model/cash.flow.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbconnect()
    try {
        const cookieStore = cookies();
        const userCookie = cookieStore.get('email');
        console.log(userCookie)
        const email=userCookie?.value.replaceAll('%40','@')
        const {amount,date,type,category,description}=await req.json()
        const revenue=await CashflowModel.create({
            date: date,
            amount: amount,
            type: type,
            category: category,
            description: description,
            useremail:email
        })
        return NextResponse.json(revenue,{status:201})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}