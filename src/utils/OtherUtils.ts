export const formatCurrency = (amount: number) => {
  return `₫${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const calculateSalePrice = (
  originalPrice: number,
  discountPercentage: number,
) => {
  const discountAmount = originalPrice * (discountPercentage / 100);
  const salePrice = originalPrice - discountAmount;
  return salePrice;
};
