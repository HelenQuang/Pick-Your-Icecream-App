export const formatCurrency = (currency) => {
  return new Intl.NumberFormat("en-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(currency);
};
