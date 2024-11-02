import type { LucideIcon } from "lucide-react"
import { HandCoins, Landmark, Users, Wallet } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { DateRangePicker } from "~/components/ui/date-range-picker"
import { H1, P } from "~/components/ui/typography"
import { formatCurrency, formatInteger, formatPercentage } from "~/lib/fmt"

export default function HomePage() {
  return (
    <div className="container space-y-10 py-8">
      <header className="flex items-center justify-between">
        <H1>Início</H1>

        <DateRangePicker />
      </header>

      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <HomeInfo
          title="Receita total"
          icon={Landmark}
          value={formatCurrency(45_231.89)}
          pastValue={formatPercentage(0.201, { signDisplay: "always" })}
        />

        <HomeInfo
          title="Vendas"
          icon={Wallet}
          value={formatInteger(12_234, { signDisplay: "always" })}
          pastValue={formatPercentage(0.19, { signDisplay: "always" })}
        />

        <HomeInfo
          title="Ticket médio"
          icon={HandCoins}
          value={formatCurrency(35.02, { signDisplay: "always" })}
          pastValue={formatPercentage(-0.1468, { signDisplay: "always" })}
        />

        <HomeInfo
          title="Novos usuários"
          icon={Users}
          value={formatInteger(74, { signDisplay: "always" })}
          pastValue={formatPercentage(0.4231, { signDisplay: "always" })}
        />
      </section>
    </div>
  )
}

function HomeInfo({
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
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>

        <Icon className="text-muted-foreground size-5" />
      </CardHeader>

      <CardContent>
        <P className="text-xl font-bold">{value}</P>
        <P className="text-muted-foreground mt-0.5 text-xs">{pastValue} desde o último mês</P>
      </CardContent>
    </Card>
  )
}
