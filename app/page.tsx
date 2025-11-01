import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BarChart3, Layers, Settings } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Timer",
      description: "Start tracking time now",
      href: "/timer",
      buttonText: "Open Timer",
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
    {
      title: "Entries",
      description: "View all time entries",
      href: "/entries",
      buttonText: "View Entries",
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
    },
    {
      title: "Projects",
      description: "Manage your projects",
      href: "/projects",
      buttonText: "Manage Projects",
      icon: <Layers className="h-5 w-5 text-primary" />,
    },
    {
      title: "Reports",
      description: "Analyze productivity",
      href: "/reports",
      buttonText: "View Reports",
      icon: <Settings className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Time Tracking System</h1>
          <p className="text-lg text-muted-foreground">
            Track your time, manage projects, and analyze productivity
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, href, buttonText, icon }) => (
            <Card
              key={title}
              className="border-border bg-card hover:bg-card/80 transition-colors"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {icon}
                  {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={href}>
                  <Button className="w-full">{buttonText}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
