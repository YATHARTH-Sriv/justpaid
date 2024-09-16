import dbconnect from "@/lib/db/connect";
import RevenueModel from "@/lib/db/model/revenue.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
   await dbconnect()
   try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('email');
    const revenuedata=await RevenueModel.find({useremail:userCookie?.value})
    console.log("revenue data",revenuedata)
    return NextResponse.json(revenuedata,{status:200})
    // await RevenueModel.find({useremail:userCookie})
   } catch (error) {
    return NextResponse.json({status:500})
   }
}