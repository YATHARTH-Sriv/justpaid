import dbconnect from "@/lib/db/connect";
import UserModel from "@/lib/db/model/user.data.model";
import { cookies } from "next/headers";
import {  NextResponse } from "next/server";

export async function POST(){
   await dbconnect()
   try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('email');
    const cookievalue=userCookie?.value.replaceAll('%40','@')
    console.log("cookie value",cookievalue)
    const userdata=await UserModel.find({email:cookievalue})
    console.log("user data",userdata)
   //  console.log("expense data",expensedata)
    return NextResponse.json(userdata,{status:200})
    // await RevenueModel.find({useremail:userCookie})
   } catch (error) {
    return NextResponse.json({status:500})
   }
}