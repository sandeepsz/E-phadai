const formatPrice = (amount: number): string => {
  return Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
};

export default formatPrice;
