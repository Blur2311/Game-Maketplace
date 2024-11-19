import apiClient from "../../../../config/apiClient";

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
    return response.data.data.map((category: any) => ({
      label: category.categoryName,
      value: category.sysIdCategory,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const saveGame = async (gameDTO: any) => {
  try {
    const response = await apiClient.post("/api/games", gameDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};

export const updateGame = async (id: number, gameDTO: any) => {
  try {
    const response = await apiClient.put(`/api/games/${id}`, gameDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
};

export const convertFileToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const validateForm = (
  gameName: string,
  price: number | null,
  quantity: number | null,
  description: string,
  selectedCategories: number[],
  thumbnail: File | null,
  logo: File | null,
  images: (File | string)[],
  discountPercent: number | null,
  existingThumbnail: string | null,
  existingLogo: string | null,
  existingImages: string[]
) => {
  const newErrors: { [key: string]: string } = {};

  if (!gameName || gameName.trim() === "") {
    newErrors.gameName = "Game name is required.";
  }
  if (!price || price <= 0) {
    newErrors.price = "Price must be greater than 0.";
  }
  if (!quantity || quantity <= 0) {
    newErrors.quantity = "Quantity must be greater than 0.";
  }
  if (!description || description.trim() === "") {
    newErrors.description = "Description is required.";
  }
  if (selectedCategories.length === 0) {
    newErrors.selectedCategories = "At least one category must be selected.";
  }
  if (!thumbnail && !existingThumbnail) {
    newErrors.thumbnail = "Thumbnail is required.";
  }
  if (!logo && !existingLogo) {
    newErrors.logo = "Logo is required.";
  }
  if (images.length === 0 && existingImages.length === 0) {
    newErrors.images = "At least one image is required.";
  }
  if (
    discountPercent === null ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    newErrors.discountPercent = "Discount percent must be between 0 and 100.";
  }

  return newErrors;
};