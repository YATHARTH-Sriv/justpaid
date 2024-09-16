
import dbconnect from "@/lib/db/connect";
import UserModel from "@/lib/db/model/user.data.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbconnect()
    try{
    const { name, email } = await req.json();
    const cookieStore = cookies();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    
    // Example of logging the incoming data
    console.log(`Received data - Name: ${name}, Email: ${email}`);

    const user = await UserModel.create({ name, email });
    cookieStore.set("email",email)
    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
