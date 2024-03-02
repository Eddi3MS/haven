export function objKeys<T extends Record<string, any>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

export function objEntries<T extends Record<string, any>>(
  obj: T
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

export function objValues<T extends Record<string, any>>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][]
}
