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

export function formatPhoneNumber(str?: string | null): string {
  if (!str) return ""

  const numStr = str.replace(/\D/g, "")

  if (!numStr) return ""

  return numStr
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
    .replace(/(\d{4})\d+?$/, "$1")
}

export function removeNumbers(str?: string): string {
  if (!str) return ""

  return str.replace(/\D/g, "")
}

export function removeNotNumbers(str?: string): string {
  if (!str) return ""

  return str?.replace(/[^0-9]/g, "")
}
