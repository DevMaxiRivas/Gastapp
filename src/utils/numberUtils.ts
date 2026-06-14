export function roundTo(number: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}