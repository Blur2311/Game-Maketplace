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

export const formatDateFromLocalDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Manages button state during an API call.
 * @param {Function} apiCall - The API call function.
 * @param {Function} setButtonDisabled - Function to set button disabled state.
 * @param {Function} onSuccess - Function to execute on successful API call.
 * @param {Function} onError - Function to execute on API call error.
 */
export const manageButtonStateDuringApiCall = async (
  apiCall: Function,
  setButtonDisabled: Function,
  onSuccess: Function,
  onError: Function
) => {
  try {
    // Disable the button to prevent multiple clicks
    setButtonDisabled(true);

    // Execute the API call
    await apiCall();

    // On success, keep the button disabled for 10 seconds
    onSuccess();
    setTimeout(() => {
      setButtonDisabled(false);
    }, 7777);
  } catch (error) {
    // On error, re-enable the button immediately
    onError(error);
    setButtonDisabled(false);
  }
};