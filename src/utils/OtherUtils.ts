export const formatCurrency = (amount: number) => {
  return `₫${Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const calculateSalePrice = (
  originalPrice: number,
  discountPercentage: number,
) => {
  const discountAmount = originalPrice * (discountPercentage / 100);
  const salePrice = originalPrice - discountAmount;
  return salePrice;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};
