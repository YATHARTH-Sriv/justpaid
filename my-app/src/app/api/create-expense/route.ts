// app/api/create-expense/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const access_token = body.access_token; // Extract access token from body

    // Prepare data for FreshBooks API
    const data = {
      expense: {
        transactionid: body.transactionid || null,
        status: body.status || null,
        has_receipt: body.has_receipt || false,
        always_remember: body.always_remember || false,
        is_cogs: body.is_cogs || false,
        account_name: body.account_name || null,
        include_receipt: body.include_receipt || false,
        amount: {
          amount: body.amount.amount,
          code: body.amount.code || "USD",
        },
        notes: body.notes,
        vendor: body.vendor,
        date: body.date,
        staffid: body.staffid || 1,
        author_name: body.author_name || null,
        taxName1: body.taxName1 || "other tax",
        taxName2: body.taxName2 || null,
        taxAmount1: {
          amount: body.taxAmount1.amount,
          code: body.taxAmount1.code || "USD",
        },
        taxPercent1: body.taxPercent1 || 13,
        taxPercent2: body.taxPercent2 || null,
        markup_percent: body.markup_percent || null,
        invoiceid: body.invoiceid || null,
        attachment: {
          jwt: body.attachment.jwt,
          media_type: body.attachment.media_type || "image/png",
          expenseid: body.attachment.expenseid || null,
        },
        categoryid: body.categoryid || "2003174",
        clientid: process.env.FRESHBOOKS_CLIENT_ID, // Environment variable for client ID
      },
    };

    // Configure the API request
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.freshbooks.com/accounting/account/G2MB3M/expenses/expenses?include%5B%5D=attachment",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`, // Use the token from request body
      },
      data,
    };

    // Send the request to FreshBooks API
    const response = await axios(config);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    // Improved error handling
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
