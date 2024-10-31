const locale = "pt-BR"

export function formatInteger(value: number, options: Intl.NumberFormatOptions = {}) {
  options.maximumFractionDigits = 0

  const formatter = Intl.NumberFormat(locale, options)

  return formatter.format(value)
}

export function formatPercentage(value: number, options: Intl.NumberFormatOptions = {}) {
  options.style = "percent"
  options.minimumFractionDigits = options.minimumFractionDigits ?? 0
  options.maximumFractionDigits = options.maximumFractionDigits ?? 2

  const formatter = Intl.NumberFormat(locale, options)

  return formatter.format(value)
}

export function formatCurrency(value: number, options: Intl.NumberFormatOptions = {}) {
  options.style = "currency"
  options.currency = "BRL"

  const formatter = Intl.NumberFormat(locale, options)

  return formatter.format(value)
}
