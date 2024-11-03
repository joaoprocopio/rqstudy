import { addDays, intervalToDuration } from "date-fns"
import type { LucideIcon } from "lucide-react"
import { HandCoins, Landmark, Users, Wallet } from "lucide-react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import { DateRangePicker } from "~/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { H1, P } from "~/components/ui/typography"
import { formatCurrency, formatInteger, formatPercentage } from "~/lib/fmt"

const chartData = [
  { month: "Janeiro", desktop: 186, mobile: 80 },
  { month: "Fevereiro", desktop: 305, mobile: 200 },
  { month: "Março", desktop: 237, mobile: 120 },
  { month: "Abril", desktop: 73, mobile: 190 },
  { month: "Maio", desktop: 209, mobile: 130 },
  { month: "Junho", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig

export default function HomePage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  return (
    <div className="container space-y-12 py-8">
      <header className="flex items-center justify-between">
        <H1>Início</H1>

        <DateRangePicker dateRange={dateRange} onSelectDateRange={setDateRange} />
      </header>

      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <HomeInfo
          title={TABS.RECEITA_TOTAL.TITLE}
          icon={Landmark}
          value={formatCurrency(45_231.89)}
          pastValue={formatPercentage(0.201, { signDisplay: "always" })}
        />

        <HomeInfo
          title={TABS.VENDAS.TITLE}
          icon={Wallet}
          value={formatInteger(12_234, { signDisplay: "always" })}
          pastValue={formatPercentage(0.19, { signDisplay: "always" })}
        />

        <HomeInfo
          title={TABS.TICKET_MEDIO.TITLE}
          icon={HandCoins}
          value={formatCurrency(35.02, { signDisplay: "always" })}
          pastValue={formatPercentage(-0.1468, { signDisplay: "always" })}
        />

        <HomeInfo
          title={TABS.NOVOS_CLIENTES.TITLE}
          icon={Users}
          value={formatInteger(74, { signDisplay: "always" })}
          pastValue={formatPercentage(0.4231, { signDisplay: "always" })}
        />
      </section>

      <Tabs defaultValue={TABS.RECEITA_TOTAL.KEY} className="space-y-6">
        <TabsList>
          <TabsTrigger value={TABS.RECEITA_TOTAL.KEY}>{TABS.RECEITA_TOTAL.TITLE}</TabsTrigger>
          <TabsTrigger value={TABS.VENDAS.KEY}>{TABS.VENDAS.TITLE}</TabsTrigger>
          <TabsTrigger value={TABS.TICKET_MEDIO.KEY}>{TABS.TICKET_MEDIO.TITLE}</TabsTrigger>
          <TabsTrigger value={TABS.NOVOS_CLIENTES.KEY}>{TABS.NOVOS_CLIENTES.TITLE}</TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.RECEITA_TOTAL.KEY}>
          <Card>
            <CardHeader>
              <CardTitle>{TABS.RECEITA_TOTAL.TITLE}</CardTitle>
              <CardDescription>Comparado com o último mês</CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer className="h-48 w-full" config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="mobile"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={TABS.VENDAS.KEY}>TODO(WIP): B</TabsContent>

        <TabsContent value={TABS.TICKET_MEDIO.KEY}>TODO(WIP): C</TabsContent>

        <TabsContent value={TABS.NOVOS_CLIENTES.KEY}>TODO(WIP): D</TabsContent>
      </Tabs>
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
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
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

const TABS = {
  RECEITA_TOTAL: {
    KEY: "receita-total",
    TITLE: "Receita total",
  },
  VENDAS: {
    KEY: "vendas",
    TITLE: "Vendas",
  },
  TICKET_MEDIO: {
    KEY: "ticket-medio",
    TITLE: "Ticket médio",
  },
  NOVOS_CLIENTES: {
    KEY: "novos-clientes",
    TITLE: "Novos clientes",
  },
} as const satisfies { [tab: string]: { KEY: string; TITLE: string } }
