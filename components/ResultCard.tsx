import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultCardProps {
  title: string
  data: any
}

export default function ResultCard({ title, data }: ResultCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p className="text-gray-400">No data available.</p>
        )}
      </CardContent>
    </Card>
  )
}

