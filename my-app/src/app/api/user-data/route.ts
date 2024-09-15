
import UserModel from "@/lib/db/model/user.data.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    
    // Example of logging the incoming data
    console.log(`Received data - Name: ${name}, Email: ${email}`);

    const user = await UserModel.create({ name, email });
    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
