export function formatPercentage(value: number, options?: Intl.NumberFormatOptions) {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  })

  return formatter.format(value)
}

export function formatCurrency(value: number, options?: Intl.NumberFormatOptions) {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    ...options,
  })

  return formatter.format(value)
}
