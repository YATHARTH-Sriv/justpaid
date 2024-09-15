import dbconnect from "@/lib/db/connect";
import UserModel from "@/lib/db/model/user.data.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    await dbconnect()
    const{name,email}=await req.json()
    console.log(name,email)
    const user=await UserModel.create({name,email})
    return NextResponse.json(user,{status:201})

  } catch (error) {
    return NextResponse.json({error:"error occured"},{status:500})
  }


}