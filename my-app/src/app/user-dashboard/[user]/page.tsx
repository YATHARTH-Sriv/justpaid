"use client"
import React from 'react'
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Package2,
  Search,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bar, BarChart, Pie, PieChart, XAxis,CartesianGrid, Sector } from 'recharts'
import { useEffect, useState } from 'react'
import axios from "axios"
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from "@/components/ui/skeleton"
import Component from '@/components/profile/page'
import SalesComponent from '@/components/sales/page'
import AiComponent from '@/components/ai/page'


 const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig
interface RevenueData {
  _id: string;
  amount: number;
  date: Date;
  source: string;
  category: string;
  description: string;
  invoiceId: string | null;
  useremail: string;
  CurrentMonth: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
const chartConfigbar = {
  amount: {
    label: "amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig
interface ExpenseData{
  _id: string;
  startingdate: Date;
  amount: number;
  title: string;
  description: string;
  useremail: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}



function Page() {
  const [revenuedata, setrevenuedata] = useState<RevenueData[]>([]);
  const [donationrevenue, setdonationrevenue] = useState(100);
  const [adsrevenue, setadsrevenue] = useState(200);
  const [incomerevenue, setincomerevenue] = useState(333);
  const [salerevenue, Setsalerevenue] = useState(55);
  const [expenses, Setexpenses] = useState(55);
  const [expensedata, setexpensedata] = useState<ExpenseData[]>([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [currentPage, setCurrentPage] = useState('Dashboard')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/get-revenue-data");
        setrevenuedata(res.data);

        const response = await axios.post("/api/get-expense-data");
        setexpensedata(response.data);

        // Initialize local totals for each category
        let totalSale = 0;
        let totalIncome = 0;
        let totalAds = 0;
        let totalDonation = 0;
        let expenseTotal = 0;

        // Iterate over the revenue data and accumulate the amounts
        res.data.forEach((data: RevenueData) => {
          if (data.category === "Sale") {
            totalSale += data.amount;
          }
          if (data.category === "Income") {
            totalIncome += data.amount;
          }
          if (data.category === "Ads") {
            totalAds += data.amount;
          }
          if (data.category === "Donation") {
            totalDonation += data.amount;
          }
        });
        response.data.forEach((data: ExpenseData) => {
          expenseTotal += data.amount;
        })

        // Set the updated state for each category
        Setsalerevenue(totalSale);
        setincomerevenue(totalIncome);
        setadsrevenue(totalAds);
        setdonationrevenue(totalDonation);
        Setexpenses(expenseTotal)
        setLoading(false); // Update loading state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const expenseCategories = [
    { name: "Sale", value: salerevenue, fill: "var(--color-chrome)" },
    { name: "Income", value: incomerevenue, fill: "var(--color-safari)" },
    { name: "Donation", value: donationrevenue, fill: "var(--color-firefox)" },
    { name: "Ads", value: adsrevenue ,fill: "var(--color-edge)"},
  ];
  
  const Dashboard = ()=>(
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${adsrevenue+salerevenue+incomerevenue+donationrevenue}</div>
                    <div className=' flex justify-between'>
                    <p className="text-xs text-muted-foreground">
                      Since The Start
                    </p>
                    <Link href={"/give-data"}>
                    <Button>
                      Add Revenue
                    </Button>
                    </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Expenses
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${expenses}</div>
                    <div className=' flex justify-between'>
                    <p className="text-xs text-muted-foreground">
                      Since The Start
                    </p>
                    <Link href={"/give-data"}>
                    <Button>
                      Add Expenses
                    </Button>
                    </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${salerevenue}</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-8 mb-8 md:grid-cols-2">
              <Card >
              <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigbar}>
                  <BarChart accessibilityLayer data={revenuedata}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="CurrentMonth"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Revenue Distribution Of Your Buisness <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Total Revenue Of Last 6 months
                </div>
              </CardFooter>
                </Card> 
                <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={expenseCategories}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      strokeWidth={5}
                      activeIndex={0}
                      activeShape={({
                        outerRadius = 0,
                        ...props
                      }: PieSectorDataItem) => (
                        <Sector {...props} outerRadius={outerRadius + 10} />
                      )}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Revenue From Different Streams <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing Total Revenue From Different Categories
                </div>
              </CardFooter>
              </Card>
              </div>
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card
                  className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                >
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Expenses</CardTitle>
                      <CardDescription>
                        Recurring Expenses 
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href="#">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Expenses</TableHead>
                          <TableHead className="hidden xl:table-column">
                            Type
                          </TableHead>
                          <TableHead className="hidden xl:table-column">
                            Status
                          </TableHead>
                          <TableHead className="hidden xl:table-column">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expensedata && expensedata.map((data)=>
                          <TableRow key={data._id}>
                          <TableCell>
                            <div className="font-medium">{data.title}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {data.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Sale
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              Approved
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">${data.amount}</TableCell>
                          </TableRow>
                         )
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-muted-foreground">
                          olivia.martin@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$1,999.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Jackson Lee
                        </p>
                        <p className="text-sm text-muted-foreground">
                          jackson.lee@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>IN</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Isabella Nguyen
                        </p>
                        <p className="text-sm text-muted-foreground">
                          isabella.nguyen@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>WK</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          William Kim
                        </p>
                        <p className="text-sm text-muted-foreground">
                          will@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$99.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Sofia Davis
                        </p>
                        <p className="text-sm text-muted-foreground">
                          sofia.davis@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
  )

  const AI =()=>(
    <AiComponent sale={salerevenue} revenue={revenuedata} expenses={expensedata}/>
  )

  const Sales =()=>(
    <SalesComponent/>
  )

  const Profile=()=>(
    <Component  username = "kalki" email = "kal@kal" />
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />
      case 'AI':
        return <AI />
      case 'Sales':
        return <Sales />
      case 'Profile':
        return <Profile />
      default:
        return <Dashboard />
    }
  }




  return (
  <>
   {loading ?
      <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-3">
        <p>Generating Your Dashboard...</p>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
     :
    <div className="flex min-h-screen w-full flex-col bg-black">
          <header className="sticky top-0 flex h-16 items-center gap-4  bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center text-white md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
                <Button
              variant={currentPage === 'Dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start "
              onClick={() => setCurrentPage('Dashboard')}
              >
                Dashboard
              </Button>
              <Button
              variant={currentPage === 'AI' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('AI')}
               >
                AI
              </Button>
              <Button
              variant={currentPage === 'Sales' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('Sales')}
               >
                Sales
              </Button>
              <Button
              variant={currentPage === 'Profile' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('Profile')}
               >
                Profile
              </Button>
            </nav>
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link href="#" className="hover:text-foreground">
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet> */}
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {renderPage()}
    </div> 
    }
  </>
  )
}

export default Page








