import dbconnect from "@/lib/db/connect";
import ExpenseModel from "@/lib/db/model/expenses.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
   await dbconnect()
   try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('email');
    const cookievalue=userCookie?.value.replaceAll('%40','@')
    const expensedata=await ExpenseModel.find({useremail:cookievalue})
   //  console.log("expense data",expensedata)
    return NextResponse.json(expensedata,{status:200})
    // await RevenueModel.find({useremail:userCookie})
   } catch (error) {
    return NextResponse.json({status:500})
   }
}