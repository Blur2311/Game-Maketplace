import apiClient from "../../../../config/apiClient";

export interface CategoryDTO {
  sysIdCategory?: string | null;
  categoryName: string;
  description: string;
}

export const fetchCategoryById = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const saveCategory = async (categoryDTO: CategoryDTO) => {
  try {
    const response = await apiClient.post("/api/categories", categoryDTO);
    return response.data;
  } catch (error) {
    console.error("Error saving category:", error);
    throw error;
  }
};