export function shortName(name: string) {
  let format = name.slice(-4)
  let firstPart = name.slice(0, 4)

  return `${firstPart}..${format}`
}
