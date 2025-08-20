// app/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Page Not Found | YourApp",
  description: "The requested page could not be found.",
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-background px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg rounded-2xl border">
          <CardContent className="flex flex-col items-center text-center p-8">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
            <h1 className="text-6xl font-bold mb-2">404</h1>
            <p className="text-lg font-medium mb-1">This page could not be found</p>
            <Button asChild variant="default">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
