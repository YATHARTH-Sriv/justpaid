import dbconnect from "@/lib/db/connect";
import ExpenseModel from "@/lib/db/model/expenses.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbconnect()
    try {
        const cookieStore = cookies();
        const userCookie = cookieStore.get('email');
        // console.log(userCookie)
        const email=userCookie?.value.replaceAll('%40','@')
        const {description,amount,servicename,start}=await req.json()
        // console.log(description,amount,servicename,start)
        
        const expense=await ExpenseModel.create({
            startingdate: start,
            amount: amount,
            title: servicename,
            description: description,
            useremail:email,
        })
        return NextResponse.json(expense,{status:201})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}