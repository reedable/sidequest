export const ALPHABET_SIZE = 26

/** A = 1, B = 2, ... Z = 26. Returns null for anything that isn't a letter. */
export function letterToNumber(letter: string): number | null {
  const code = letter.toUpperCase().charCodeAt(0)
  if (code < 65 || code > 90) return null
  return code - 64
}

/** 1 = A, 2 = B, ... 26 = Z. */
export function numberToLetter(n: number): string {
  return String.fromCharCode(n + 64)
}

/** The raw sum, before it wraps. This is the number kids see go past 26. */
export function shiftedNumber(n: number, key: number): number {
  return n + key
}

/** The sum after wrapping back into 1..26. */
export function wrappedNumber(n: number, key: number): number {
  return ((n - 1 + key) % ALPHABET_SIZE) + 1
}

export function encryptLetter(letter: string, key: number): string {
  const n = letterToNumber(letter)
  if (n === null) return letter
  return numberToLetter(wrappedNumber(n, key))
}

export function encrypt(text: string, key: number): string {
  return text
    .split('')
    .map((c) => encryptLetter(c, key))
    .join('')
}

export function decrypt(text: string, key: number): string {
  return encrypt(text, ALPHABET_SIZE - (key % ALPHABET_SIZE))
}
