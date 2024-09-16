import dbconnect from "@/lib/db/connect";
import InvoiceModel from "@/lib/db/model/invoices.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbconnect()
    try {
        const cookieStore = cookies();
        const userCookie = cookieStore.get('email');
        console.log(userCookie)
        const email=userCookie?.value.replaceAll('%40','@')
        const {invoiceId,client,amount,status}=await req.json()
        const revenue=await InvoiceModel.create({
            invoiceId: invoiceId,
            client: client,
            amount: amount,
            status: status,
            useremail:email
        })
        return NextResponse.json(revenue,{status:201})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}