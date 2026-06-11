export const CurrencyTypeObject = {
    USD: "USD",
    EUR: "EUR",
    ARS: "ARS",
    // GBP: "GBP",
    // BTC: "BTC",
    // ETH: "ETH",
    // USDT: "USDT",
    // USDC: "USDC",
    // XRP: "XRP",
    // BRL: "BRL",
} as const;

export type CurrencyType = typeof CurrencyTypeObject[keyof typeof CurrencyTypeObject];