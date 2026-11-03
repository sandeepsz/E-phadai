const formatPrice = (amount: number): string => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default formatPrice;
