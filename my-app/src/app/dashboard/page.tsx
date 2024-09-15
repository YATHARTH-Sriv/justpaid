"use client"
import React from 'react'
// import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
// import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

// const revenueData = [
//   { month: "Jan", revenue: 5000 },
//   { month: "Feb", revenue: 7500 },
//   { month: "Mar", revenue: 9000 },
//   { month: "Apr", revenue: 11000 },
//   { month: "May", revenue: 8500 },
//   { month: "Jun", revenue: 10500 },
// ]

// const expenseCategories = [
//   { name: "Salaries", value: 50000 },
//   { name: "Marketing", value: 15000 },
//   { name: "Operations", value: 20000 },
//   { name: "Technology", value: 10000 },
//   { name: "Other", value: 5000 },
// ]

// const invoices = [
//   { id: "INV001", client: "Acme Corp", amount: 5000, status: "Paid" },
//   { id: "INV002", client: "Globex Inc", amount: 7500, status: "Pending" },
//   { id: "INV003", client: "Wayne Enterprises", amount: 12000, status: "Overdue" },
//   { id: "INV004", client: "Stark Industries", amount: 8500, status: "Paid" },
//   { id: "INV005", client: "Umbrella Corp", amount: 6000, status: "Pending" },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']


function Page() { // Capitalized the 'P' in Page
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user)
  const sampleData = {
    amount: { amount: '79.73', code: 'USD' },
    notes: 'Purchased Gasoline for deliveries',
    vendor: 'Shell Gas Station',
    date: '2019-04-24',
    taxAmount1: { amount: '9.17', code: 'USD' },
    taxPercent1: 13,
    has_receipt: false,
    attachment: {
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50Ijo0MjM2NDEwLCJvcmlnaW5hbF9maWxlbmFtZSI6IlNjcmVlbiBTaG90IDIwMTktMDQtMjQgYXQgOS4zOS4xOSBBTS5wbmciLCJidWNrZXQiOiJ1cGxvYWRzIiwiZmlsZW5hbWUiOiJ1cGxvYWQtMGU2ZDMwOWQ1ZTI5MzA3NmNhMGIyNDdkODFlOGJlNWE4NDZlZWE0YSIsImxlbmd0aCI6MTkxNDcyLCJrZXkiOiInZG9jcy0nLTQyMzY0MTAvdXBsb2FkLTBlNmQzMDlkNWUyOTMwNzZjYTBiMjQ3ZDgxZThiZTVhODQ2ZWVhNGEifQ.SOoW3_nTUrxjYO76g1UXHPIrO_aLbTpXCHEa-ZcnejA',
      media_type: 'image/png',
      expenseid: null,
    },
    categoryid: '2003174',
    clientid: null,
  };

  // Access token
  const accessToken = session?.accessToken

  const createExpense = async () => {
    try {
      const response = await axios.post(`/api/create-expense`, {
        ...sampleData,
        access_token: accessToken,
      });
      
      

      console.log('Expense created:', response.data);
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  return (<div>
    Creating expense...
    <Button onClick={createExpense}>create</Button>
    </div>
  )

  // return (
  //   // <div className="p-8 bg-gray-100 min-h-screen">
  //   //   <h1 className="text-4xl font-bold mb-8">Finance Dashboard Welcome {user?.name}</h1>
  //   //   <h1 className="text-2xl font-bold mb-8"> Welcome {user?.name}</h1>
      
  //   //   <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
  //   //     <Card>
  //   //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //   //         <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
  //   //         <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //         <div className="text-2xl font-bold">$52,000</div>
  //   //         <p className="text-xs text-muted-foreground">+20.1% from last month</p>
  //   //       </CardContent>
  //   //     </Card>
  //   //     <Card>
  //   //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //   //         <CardTitle className="text-sm font-medium">Expenses</CardTitle>
  //   //         <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //         <div className="text-2xl font-bold">$21,500</div>
  //   //         <p className="text-xs text-muted-foreground">+5.4% from last month</p>
  //   //       </CardContent>
  //   //     </Card>
  //   //     <Card>
  //   //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //   //         <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
  //   //         <ArrowUpIcon className="h-4 w-4 text-green-500" />
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //         <div className="text-2xl font-bold">+$30,500</div>
  //   //         <p className="text-xs text-muted-foreground">+12.5% from last month</p>
  //   //       </CardContent>
  //   //     </Card>
  //   //     <Card>
  //   //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //   //         <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
  //   //         <ArrowDownIcon className="h-4 w-4 text-red-500" />
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //         <div className="text-2xl font-bold">$13,500</div>
  //   //         <p className="text-xs text-muted-foreground">-3.2% from last month</p>
  //   //       </CardContent>
  //   //     </Card>
  //   //   </div>

  //   //   <div className="grid gap-8 mb-8 md:grid-cols-2">
  //   //     <Card>
  //   //       <CardHeader>
  //   //         <CardTitle>Revenue Over Time</CardTitle>
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //         <ResponsiveContainer width="100%" height={300}>
  //   //           <BarChart data={revenueData}>
  //   //             <XAxis dataKey="month" />
  //   //             <YAxis />
  //   //             <Bar dataKey="revenue" fill="#8884d8" />
  //   //           </BarChart>
  //   //         </ResponsiveContainer>
  //   //       </CardContent>
  //   //     </Card>
  //   //     <Card>
  //   //       <CardHeader>
  //   //         <CardTitle>Expense Breakdown</CardTitle>
  //   //       </CardHeader>
  //   //       <CardContent>
  //   //         <ResponsiveContainer width="100%" height={300}>
  //   //           <PieChart>
  //   //             <Pie
  //   //               data={expenseCategories}
  //   //               cx="50%"
  //   //               cy="50%"
  //   //               outerRadius={80}
  //   //               fill="#8884d8"
  //   //               dataKey="value"
  //   //               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
  //   //             >
  //   //               {expenseCategories.map((entry, index) => (
  //   //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //   //               ))}
  //   //             </Pie>
  //   //           </PieChart>
  //   //         </ResponsiveContainer>
  //   //       </CardContent>
  //   //     </Card>
  //   //   </div>

  //   //   <Card>
  //   //     <CardHeader>
  //   //       <CardTitle>Recent Invoices</CardTitle>
  //   //       <CardDescription>A list of recent invoices and their status</CardDescription>
  //   //     </CardHeader>
  //   //     <CardContent>
  //   //       <Table>
  //   //         <TableHeader>
  //   //           <TableRow>
  //   //             <TableHead>Invoice ID</TableHead>
  //   //             <TableHead>Client</TableHead>
  //   //             <TableHead>Amount</TableHead>
  //   //             <TableHead>Status</TableHead>
  //   //           </TableRow>
  //   //         </TableHeader>
  //   //         <TableBody>
  //   //           {invoices.map((invoice) => (
  //   //             <TableRow key={invoice.id}>
  //   //               <TableCell>{invoice.id}</TableCell>
  //   //               <TableCell>{invoice.client}</TableCell>
  //   //               <TableCell>${invoice.amount.toLocaleString()}</TableCell>
  //   //               <TableCell>
  //   //                 <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
  //   //                   invoice.status === 'Paid' ? 'bg-green-200 text-green-800' :
  //   //                   invoice.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
  //   //                   'bg-red-200 text-red-800'
  //   //                 }`}>
  //   //                   {invoice.status}
  //   //                 </span>
  //   //               </TableCell>
  //   //             </TableRow>
  //   //           ))}
  //   //         </TableBody>
  //   //       </Table>
  //   //     </CardContent>
  //   //   </Card>
  //   // </div>

  // );
}

export default Page;