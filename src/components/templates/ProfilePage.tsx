'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

interface TypingStats {
  wpm: number
  accuracy: number
  timestamp: string
  testType: string
}

interface ProfilePageProps {
  user: any
  stats: TypingStats[]
  isLoading?: boolean
}

export function ProfilePage({ user, stats, isLoading = false }: ProfilePageProps) {
  const averageWPM = stats.length > 0
    ? Math.round(stats.reduce((acc, curr) => acc + curr.wpm, 0) / stats.length)
    : 0

  const averageAccuracy = stats.length > 0
    ? Math.round(stats.reduce((acc, curr) => acc + curr.accuracy, 0) / stats.length)
    : 0

  const bestWPM = stats.length > 0
    ? Math.max(...stats.map(s => s.wpm))
    : 0

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col gap-8">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64 mt-2" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32 mt-2" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-4 w-24 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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

        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Tests</CardTitle>
            <CardDescription>Your latest typing test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.slice(0, 5).map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{stat.testType}</p>
                    <p className="text-sm text-muted-foreground">{stat.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stat.wpm} WPM</p>
                    <p className="text-sm text-muted-foreground">{stat.accuracy}% accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
