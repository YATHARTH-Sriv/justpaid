"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import Chat from "../chat/page";

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

interface InsightData {
  text: string;
  icon: string; // Since the icon is a string from your API response
  color: string;
}

const chartConfigbar = {
    amount: {
      label: "amount",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  export default function AiComponent({ sale, revenue, expenses }: { sale: number; revenue: RevenueData[]; expenses: ExpenseData[] }) {
    console.log("data from page", sale, revenue, expenses);
    const [insights, setInsights] = useState<InsightData[]>([]);
    const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('/api/insights-gemini', {
          revenuedata: revenue,
          expensedata: expenses
        });
        setInsights(res.data.insights);
        console.log('data from gemini api', res.data.insights);
        setLoading(false);
        console.log('data from api', res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [revenue, expenses]);

  const positiveInsights = insights.filter(insight => insight.text.includes("* **Positive:**")).map(insight => ({
    ...insight,
    text: insight.text
      .replace("* **Positive:**", "")
      .replaceAll('**', '') // Replace all occurrences of '***'
      .trim()
  }));
  const negativeInsights = insights.filter(insight => insight.text.includes("* **Negative:**")).map(insight => ({
    ...insight,
    text: insight.text
      .replace("* **Negative:**", "")
      .replaceAll('**', '') // Replace all occurrences of '***'
      .trim()
  }));

  return (
    <>
    {loading ?
      <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-3">
        <p className=" text-2xl text-white">Retrieving Insights From AI...</p>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      </div>:
      <div className="p-4 space-y-6 bg-gradient-to-br bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">AI Business Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Positive Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {positiveInsights.map((insight, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg bg-white shadow"
            >
              <div className="p-2 rounded-full bg-gray-100">
                <span dangerouslySetInnerHTML={{ __html: insight.icon }}></span>
              </div>
              <span className={`font-medium ${insight.color}`}>
                {insight.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Negative Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {negativeInsights.map((insight, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg bg-white shadow"
            >
              <div className="p-2 rounded-full bg-gray-100">
                <span dangerouslySetInnerHTML={{ __html: insight.icon }}></span>
              </div>
              <span className={`font-medium ${insight.color}`}>
                {insight.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigbar}>
          <BarChart accessibilityLayer data={revenue}>
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
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
      </div>
      <Chat/>

      </div>
    }
    </>
    );
  }
