import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { formatCurrency, formatPercentage } from "~/lib/fmt"

export default function HomePage() {
  return (
    <div className="container py-6">
      <header className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de vendas realizadas</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(3252.534)}</p>
            <p className="text-muted-foreground text-xs">
              {formatPercentage(0.253, { signDisplay: "always" })} em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </header>
    </div>
  )
}
