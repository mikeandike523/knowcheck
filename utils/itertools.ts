/**
 *
 * Generate an indexing array, i.e. 0, 1, 2, ..., N - 1 (inclusive)
 *
 * @param N -
 */
export function iota(N: number): readonly number[] {
  return Array.from(Array(N).keys());
}

/**
 *
 * Similar to python "zip" but unfortunately is not lazy
 *
 * @param a -
 * @param b -
 * @returns
 */
export function zip<T, U>(a: readonly T[], b: readonly U[]): readonly [T, U][] {
  return a.map((_, i) => [a[i], b[i]]);
}

/**
 *
 * Similar to python "enumerate" but unfortunately is not lazy
 *
 * @param a -
 * @returns
 */
export function enumerate<T>(a: readonly T[]): readonly [number, T][] {
  return zip(iota(a.length), a);
}
