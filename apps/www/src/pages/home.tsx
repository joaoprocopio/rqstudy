import type { LucideIcon } from "lucide-react"
import { HandCoins, Landmark, Users, Wallet } from "lucide-react"

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
        <CustomCard
          title="Receita total"
          icon={Landmark}
          value={formatCurrency(45_231.89)}
          pastValue={formatPercentage(0.201, { signDisplay: "always" })}
        />

        <CustomCard
          title="Vendas"
          icon={Wallet}
          value={formatInteger(12_234, { signDisplay: "always" })}
          pastValue={formatPercentage(0.19, { signDisplay: "always" })}
        />

        <CustomCard
          title="Ticket médio"
          icon={HandCoins}
          value={formatCurrency(35.02, { signDisplay: "always" })}
          pastValue={formatPercentage(-0.1468, { signDisplay: "always" })}
        />

        <CustomCard
          title="Novos usuários"
          icon={Users}
          value={formatInteger(74, { signDisplay: "always" })}
          pastValue={formatPercentage(0.4231, { signDisplay: "always" })}
        />
      </div>
    </div>
  )
}

function CustomCard({
  title,
  icon: Icon,
  value,
  pastValue,
}: {
  title: string
  icon: LucideIcon
  value: string
  pastValue: string
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>

        <Icon className="text-muted-foreground size-5" />
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-muted-foreground text-xs">{pastValue} desde o último mês</p>
      </CardContent>
    </Card>
  )
}
