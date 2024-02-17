export function formatToCurrency(str?: string) {
  if (!str) return ""
  let numericValue = Number(str.replace(/\D/g, ""))

  if (!numericValue) return ""

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue / 100)

  return formattedValue
}

export function formatPhoneNumber(str?: string): string {
  if (!str) return ""

  const numStr = str.replace(/\D/g, "")

  if (!numStr) return ""

  let areaCode = numStr.substring(0, 2)
  let prefix = numStr.substring(2, 7)
  let suffix = numStr.substring(7)

  if (numStr.length === 11) {
    return `(${areaCode}) ${prefix}-${suffix}`
  }

  let formatted = `(${areaCode}`

  if (prefix) {
    formatted += `) ${prefix}`
  }

  if (suffix) {
    formatted += `-${suffix}`
  }

  return formatted
}

export function removeNumbers(str?: string): string {
  if (!str) return ""

  return str.replace(/\D/g, "")
}

export function removeNotNumbers(str?: string): string {
  if (!str) return ""

  return str?.replace(/[^0-9]/g, "")
}
