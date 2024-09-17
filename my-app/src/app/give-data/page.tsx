"use client"
import React,  { useState } from 'react'
import { GridPattern } from '@/components/ui/gridbacl'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

function page() {
  const {toast}= useToast()
  const [revenue, setRevenue] = useState({
    amount: '',
    date: '',
    source: '',
    category: '',
    description: '',
    invoiceId: '',
    currentmonth: ''
  })

  const [invoice, setInvoice] = useState({
    invoiceId: '',
    client: '',
    amount: "",
    status: ''
  })

  const [cashFlow, setCashFlow] = useState({
    date: '',
    amount: '',
    type: '',
    category: '',
    description: ''
  })

  const [expenses, setExpenses] = useState({
    description:"",
    amount:"",
    servicename:"",
    start:"",
  })

  const handleRevenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Revenue submitted:', revenue)
    const res=await axios.post("/api/revenue-data",{
        amount: revenue.amount,
        date: revenue.date,
        source: revenue.source,
        category: revenue.category,
        description: revenue.description,
        invoiceId: revenue.invoiceId,
        currentmonth: new Date().toLocaleString('default', { month: 'long' })
    })
    if(res.status===201){
        console.log(res.data)
        toast({
            title: "Revenue Data Recorded",
            description: "Add More Records If You Want",
          })
    }
    // Here you would typically send the data to your backend
  }

  const handleInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Invoice submitted:', invoice)
    const res=await axios.post("/api/invoice-data",{
            invoiceId: invoice.invoiceId,
            client: invoice.client,
            amount: invoice.amount,
            status: invoice.status
    })
    if(res.status===201){
        console.log(res.data)
        toast({
            title: "Invoice Data Recorded",
            description: "Add More Records If You Want",
          })
    }
    // Here you would typically send the data to your backend
  }

  const handleCashFlowSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Cash Flow submitted:', cashFlow)
    // Here you would typically send the data to your backend
    const res=await axios.post("/api/cash-flow",{
        date: cashFlow.date,
        amount: cashFlow.amount,
        type: cashFlow.type,
        category: cashFlow.category, 
        description: cashFlow.description, 
        })
        if(res.status===201){
            console.log(res.data)
            toast({
                title: "Cash Flow Data Recorded",
                description: "Add More Records If You Want",
            })
        }
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Expense submitted:', expenses)
    const res=await axios.post("/api/expense-data",{
        description:expenses.description,
        amount:expenses.amount,
        servicename:expenses.servicename,
        start:expenses.start,
    })
    if(res.status===201){
        console.log(res.data)
        toast({
            title: "Expense Data Recorded",
            description: "Add More Records If You Want",
          })
    }
    // Here you would typically send the data to your backend
  }

  return (
    <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
       {/* Background GridPattern */}
       <div className="absolute inset-0 z-0 overflow-hidden">
         <GridPattern />
       </div>
       <div className="relative text-white z-10 flex items-center justify-center">
            <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Financial Data Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="revenue">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="invoice">Invoice</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>
                <TabsContent value="revenue">
                    <form onSubmit={handleRevenueSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="revenue-amount">Amount</Label>
                        <Input
                            id="revenue-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={revenue.amount}
                            onChange={(e) => setRevenue({...revenue, amount: e.target.value})}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="revenue-date">Date</Label>
                        <Input
                            id="revenue-date"
                            type="date"
                            value={revenue.date}
                            onChange={(e) => setRevenue({...revenue, date: e.target.value})}
                            required
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="revenue-source">Source</Label>
                        <Input
                        id="revenue-source"
                        placeholder="Enter source"
                        value={revenue.source}
                        onChange={(e) => setRevenue({...revenue, source: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="revenue-category">Category</Label>
                        <Input
                        id="revenue-category"
                        placeholder="Enter category"
                        value={revenue.category}
                        onChange={(e) => setRevenue({...revenue, category: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="revenue-description">Description</Label>
                        <Input
                        id="revenue-description"
                        placeholder="Enter description"
                        value={revenue.description}
                        onChange={(e) => setRevenue({...revenue, description: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="revenue-invoiceId">Invoice ID</Label>
                        <Input
                        id="revenue-invoiceId"
                        placeholder="Enter Invoice ID"
                        value={revenue.invoiceId}
                        onChange={(e) => setRevenue({...revenue, invoiceId: e.target.value})}
                        />
                    </div>
                    <Button type="submit" >Submit Revenue</Button>
                    </form>
                </TabsContent>
                <TabsContent value="invoice">
                    <form onSubmit={handleInvoiceSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="invoice-id">Invoice ID</Label>
                        <Input
                        id="invoice-id"
                        placeholder="Enter Invoice ID"
                        value={invoice.invoiceId}
                        onChange={(e) => setInvoice({...invoice, invoiceId: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invoice-client">Client</Label>
                        <Input
                        id="invoice-client"
                        placeholder="Enter client name"
                        value={invoice.client}
                        onChange={(e) => setInvoice({...invoice, client: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invoice-amount">Amount</Label>
                        <Input
                        id="invoice-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={invoice.amount}
                        onChange={(e) => setInvoice({...invoice, amount: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invoice-status">Status</Label>
                        <Select onValueChange={(value) => setInvoice({...invoice, status: value})}>
                        <SelectTrigger id="invoice-status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit">Submit Invoice</Button>
                    </form>
                </TabsContent>
                {/* <TabsContent value="cashflow">
                    <form onSubmit={handleCashFlowSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="cashflow-date">Date</Label>
                        <Input
                            id="cashflow-date"
                            type="date"
                            value={cashFlow.date}
                            onChange={(e) => setCashFlow({...cashFlow, date: e.target.value})}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="cashflow-amount">Amount</Label>
                        <Input
                            id="cashflow-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={cashFlow.amount}
                            onChange={(e) => setCashFlow({...cashFlow, amount: e.target.value})}
                            required
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cashflow-type">Type</Label>
                        <Select onValueChange={(value) => setCashFlow({...cashFlow, type: value})}>
                        <SelectTrigger id="cashflow-type">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inflow">Inflow</SelectItem>
                            <SelectItem value="outflow">Outflow</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cashflow-category">Category</Label>
                        <Input
                        id="cashflow-category"
                        placeholder="Enter category"
                        value={cashFlow.category}
                        onChange={(e) => setCashFlow({...cashFlow, category: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cashflow-description">Description</Label>
                        <Input
                        id="cashflow-description"
                        placeholder="Enter description"
                        value={cashFlow.description}
                        onChange={(e) => setCashFlow({...cashFlow, description: e.target.value})}
                        />
                    </div>
                    <Button type="submit">Submit Cash Flow</Button>
                    </form>
                </TabsContent> */}
                <TabsContent value="expenses">
                    <form onSubmit={handleExpenseSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="expenses-amount">Amount</Label>
                        <Input
                            id="expenses-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={expenses.amount}
                            onChange={(e) => setExpenses({...expenses, amount: e.target.value})}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="expenses-start">Starting Date</Label>
                        <Input
                            id="expenses-start"
                            type="date"
                            value={expenses.start}
                            onChange={(e) => setExpenses({...expenses, start: e.target.value})}
                            required
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expenses-description">Description</Label>
                        <Input
                        id="expenses-description"
                        placeholder="Enter Description"
                        value={expenses.description}
                        onChange={(e) => setExpenses({...expenses, description: e.target.value})}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expenses-service">Service-Name</Label>
                        <Input
                        id="expenses-service"
                        placeholder="Enter Service Name"
                        value={expenses.servicename}
                        onChange={(e) => setExpenses({...expenses, servicename: e.target.value})}
                        required
                        />
                    </div>
                    <Button type="submit" >Submit Expense</Button>
                    </form>
                </TabsContent>
                </Tabs>
            </CardContent>
            </Card>
            <div>
                <Link href={`/user-dashboard/kalki`}>
                 <Button className='bg-white text-black hover:bg-white p-2 m-3'>Go To Dashboard</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}
    

export default page