import apiClient from "../../../config/apiClient";
import { Game } from "../../../utils/BrowserUtils";

export const fetchGames = async (page = 0, size = 12) => {
  const response = await apiClient.get<{
    content: Game[];
    totalElements: number;
    totalPages: number;
    size: number;
  }>(`/api/games/p/browser?page=${page}&size=${size}`);
  return response.data;
};

export const searchGames = async (
  name: string,
  minPrice?: number,
  maxPrice?: number,
  genre?: string,
  page = 0,
  size = 12,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (name) params.append("name", name);
  if (maxPrice !== undefined) params.append("minPrice", maxPrice.toString());
  if (minPrice !== undefined) params.append("maxPrice", minPrice.toString());
  if (genre) params.append("category", genre);

  const response = await apiClient.get<{
    content: Game[];
    totalElements: number;
    totalPages: number;
    size: number;
  }>(`/api/games/p/browser?${params.toString()}`);
  return response.data;
};
