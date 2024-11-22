export const formatCurrency = (amount: number) => {
  return `₫${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatDateFromLocalDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  // Định dạng ngày (tháng viết tắt và ngày)
  const optionsDate: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  // Định dạng thời gian (giờ, phút, AM/PM)
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate); // "Nov 20"
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime); // "10:33 AM"

  return `${formattedDate}, ${formattedTime}`;
};

export const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const formatDateToDDMMYYYY = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const isDateValid = (iDate: string, sDate: Date, eDate: Date) : boolean => {
  const date = normalizeDate(new Date(iDate));
  const startDate = normalizeDate(sDate);
  const endDate = normalizeDate(eDate);

  return (date >= startDate && date <= endDate);
}

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
  onError: Function,
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
