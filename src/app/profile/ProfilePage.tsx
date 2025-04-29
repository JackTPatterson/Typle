'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {useTheme} from "@/hooks/use-theme";

export function ProfilePage({ user, stats, streak }: Readonly<{ user: any, stats: any , streak: number}>) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const averageWPM = stats?.length > 0
    ? Math.round(stats.reduce((acc: any, curr: any) => acc + curr.wpm, 0) / stats.length)
    : 0

  const averageAccuracy = stats?.length > 0
    ? Math.round(stats.reduce((acc: any, curr: any) => acc + curr.accuracy, 0) / stats.length)
    : 0

  const bestWPM = stats?.length > 0
    ? Math.max(...stats.map((s: any) => s.wpm))
    : 0


  const { theme, setTheme, availableThemes } = useTheme();

  console.log(user)


  return (
    <div className="container mx-auto py-10 w-full">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

        </div>
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>

          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Streak</CardTitle>
                  <CardDescription>Tests completed consecutively</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{streak?.toString()} Days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average WPM</CardTitle>
                  <CardDescription>Your average typing speed</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{averageWPM} WPM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Accuracy</CardTitle>
                  <CardDescription>Your average typing accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{averageAccuracy}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best WPM</CardTitle>
                  <CardDescription>Your highest typing speed</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{bestWPM} WPM</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
                <CardDescription>Your typing speed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="wpm" stroke="#8884d8" name="WPM" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
                <CardDescription>Your latest typing test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.length > 0 ? (
                    stats.map((stat: any, index: any) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{stat.prompt.slice(0, 20)}...</p>
                          <p className="text-sm text-muted-foreground">{stat.timestamp}</p>
                        </div>
                        <div className="text-right mx-4">
                          <p className="font-medium">{stat.wpm} WPM</p>
                          <p className="text-sm text-muted-foreground">{stat.accuracy}% accuracy</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPrompt(stat.prompt)
                            setIsDialogOpen(true)
                          }}
                        >
                          View More
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No test results yet. Take your first test!</p>
                      <Button className="mt-4">Take a Test</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Prompt</DialogTitle>
            <DialogDescription>
              The full text of the typing test prompt
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm leading-relaxed">{selectedPrompt}</p>
          </div>
        </DialogContent>
      </Dialog>
      <Tabs defaultValue={theme} value={theme} onValueChange={(val) => setTheme(val as any)} className="w-full mt-4">
        <TabsList className="grid w-fit grid-cols-2 sm:grid-cols-4">
          {availableThemes.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
