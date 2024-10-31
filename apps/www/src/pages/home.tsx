import { DollarSign, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { DateRangePicker } from "~/components/ui/date-range-picker"
import { formatCurrency, formatInteger, formatPercentage } from "~/lib/fmt"

export default function HomePage() {
  return (
    <div className="container space-y-12 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Início</h1>

        <DateRangePicker />
      </header>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Receita Total</CardTitle>

            <DollarSign className="text-muted-foreground size-5" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(45_231.89)}</p>
            <p className="text-muted-foreground text-xs">
              {formatPercentage(0.201, { signDisplay: "always" })} desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Vendas</CardTitle>

            <TrendingUp className="text-muted-foreground size-5" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{formatInteger(12_234)}</p>
            <p className="text-muted-foreground text-xs">
              {formatPercentage(0.19, { signDisplay: "always" })} desde o último mês
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
