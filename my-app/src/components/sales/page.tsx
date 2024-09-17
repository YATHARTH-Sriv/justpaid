import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SalesComponent() {
  // Mock data
  const [recentTransactions] = useState([
    { id: 1, user: "Alice Johnson", amount: 199.99, date: "2023-06-01" },
    { id: 2, user: "Bob Smith", amount: 99.99, date: "2023-06-02" },
    { id: 3, user: "Charlie Brown", amount: 299.99, date: "2023-06-03" },
  ])

  const [paidUsers] = useState([
    { id: 1, user: "David Lee", plan: "Premium" },
    { id: 2, user: "Eva Garcia", plan: "Ultra" },
    { id: 3, user: "Frank Wilson", plan: "Premium" },
  ])

  const [newSignups] = useState([
    { id: 1, user: "Grace Taylor", preferredPlan: "Free" },
    { id: 2, user: "Henry Davis", preferredPlan: "Premium" },
    { id: 3, user: "Ivy Chen", preferredPlan: "Ultra" },
  ])

  // Calculate metrics
  const totalSignups = newSignups.length
  const paidSignups = newSignups.filter(user => user.preferredPlan !== "Free").length
  const conversionRate = (paidSignups / totalSignups) * 100

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Sales Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paid Users</CardTitle>
            <CardDescription>Users with Premium or Ultra plans</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.user}</TableCell>
                    <TableCell>
                      <Badge variant={user.plan === "Ultra" ? "destructive" : "default"}>
                        {user.plan}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Sign-ups</CardTitle>
            <CardDescription>Recent user registrations with preferred plans</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Preferred Plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newSignups.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.user}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          user.preferredPlan === "Ultra" 
                            ? "destructive" 
                            : user.preferredPlan === "Premium" 
                              ? "default" 
                              : "secondary"
                        }
                      >
                        {user.preferredPlan}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Metrics</CardTitle>
            <CardDescription>Sign-ups vs Paid Plan Conversions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Total Sign-ups: {totalSignups}</p>
              <p className="text-sm font-medium">Paid Plan Conversions: {paidSignups}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Conversion Rate: {conversionRate.toFixed(2)}%</p>
              <Progress value={conversionRate} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}