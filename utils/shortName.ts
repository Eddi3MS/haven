export function shortName(name: string) {
  if (name.length <= 8) return name
  let format = name.slice(-4)
  let firstPart = name.slice(0, 4)

  return `${firstPart}..${format}`
}
