"use client"
import React, { useState } from 'react'
import { GridPattern } from '@/components/ui/gridbacl'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'
import { useRouter } from 'next/navigation'

function page() {
    const [pagenumber, setpagenumber] = useState(1)
  const router=useRouter()
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
    router.push(`/user-dashboard/${formData.username}`)

    }
    // Here you could also send the data to an API or perform other actions
  }
  return (
    <div>
         <div className="absolute inset-0 z-0 overflow-hidden">
         <GridPattern />
         </div>
         <div className="relative text-white z-10 flex items-center justify-center">
         <form onSubmit={handleSubmit}>
         <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </form>
         </div>
    </div>
  )
}

export default page
