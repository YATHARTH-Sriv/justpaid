"use client"
import React, { useState } from 'react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GridPattern } from '@/components/ui/gridbacl'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'
import { LinkPreview } from "@/components/ui/link-preview";
import Link from 'next/link'


function Page() { // Capitalized the 'P' in Page
  const [pagenumber, setpagenumber] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  console.log(formData)
  const [storedData, setStoredData] = useState({
    username: '',
    email: ''
  })
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res=await axios.post('/api/user-data', {
      name: formData.username,
      email: formData.email
    })
    console.log(res.data)
    if(res.status===201){
    setStoredData(formData)
    setpagenumber(pagenumber+1)
    }
    // Here you could also send the data to an API or perform other actions
  }
  return (
    <div>
       {pagenumber===1 && 
       <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
       {/* Background GridPattern */}
       <div className="absolute inset-0 z-0 overflow-hidden">
         <GridPattern />
       </div>
       <div className="relative text-white z-10 flex items-center justify-center">
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Enter your username and email</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username"
                placeholder="Enter your username" 
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4 p-0">
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </CardContent>
      <CardContent>
        <h3 className="font-semibold mb-2">Stored Information:</h3>
        <p>Username: {storedData.username}</p>
        <p>Email: {storedData.email}</p>
      </CardContent>
    </Card>
      </div>
       </div>
       }
       {pagenumber===2 &&
       <div className="p-8 bg-gray-100 min-h-screen ">
            <h1 className="text-4xl font-bold mb-8">Finance Dashboard</h1>
            <h1 className="text-2xl font-bold mb-8"> Welcome {formData.username}</h1>
            
            <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium"> Revenue</CardTitle>
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold ">Import Your Revenue</div>
                  <Link href={"/give-data"}><Button className=' p-2 m-2 ml-16'>Give me details</Button></Link> 
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Import Your Expenses</div>
                  <Link href={"/give-data"}><Button className=' p-2 m-2 ml-16'>Give me details</Button></Link> 
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
                  <ArrowUpIcon className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Import Your Cash Flow</div>
                  <Link href={"/give-data"}><Button className=' p-2 m-2 ml-16'>Give me details</Button></Link>  
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Import Your Invoices</div>
                  <Link href={"/give-data"}><Button className=' p-2 m-2 ml-16'>Give me details</Button></Link> 
                </CardContent>
              </Card>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-3xl text-center mb-10">
              Your{" "}
              <LinkPreview
                url="https://ui.aceternity.com"
                imageSrc="/dash.png"
                isStatic
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                Dashboard
              </LinkPreview>{" "}
              is a place<br/> where you can see all your financial information in one place
            </p>
      
            <p className="text-neutral-500 dark:text-neutral-400 text-3xl   text-center ">
              Let {" "}
              <LinkPreview
                imageSrc="/home.png"
                url="https://justpaid-roan.vercel.app/"
                isStatic
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                Just Paid
              </LinkPreview>{" "}
              Help You Manage Your Finances{" "}
            </p>
          </div>
       } 
    </div>
    
  )
}

export default Page;
