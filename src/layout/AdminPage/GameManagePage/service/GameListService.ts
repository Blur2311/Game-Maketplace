import apiClient from "../../../../config/apiClient";

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/api/categories");
    const allCategories = response.data.data;
    if (Array.isArray(allCategories)) {
      for (let i = 0; i < allCategories.length; i++) {
        allCategories[i].name = allCategories[i].categoryName;
        allCategories[i].code = allCategories[i].sysIdCategory;
      }
      return allCategories;
    } else {
      throw new Error("API response is not an array");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchGames = async (
  first: number,
  rows: number,
  searchTerm: string,
  selectedCategories: number[],
  selectedStatus: string[],
  selectedOption: string
) => {
  try {
    const response = await apiClient.get("/api/games");
    const allGames = response.data.data;
    if (Array.isArray(allGames)) {
      let filteredGames = allGames.filter((game: any) =>
        game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategories.length > 0) {
        filteredGames = filteredGames.filter((game: any) =>
          game.categoryDetails.some((category: any) =>
            selectedCategories.includes(category.sysIdCategory)
          )
        );
      }

      if (selectedStatus.length > 0) {
        filteredGames = filteredGames.filter((game: any) =>
          selectedStatus.includes(game.isActive.toString())
        );
      }

      if (selectedOption === "newest") {
        filteredGames.sort(
          (a: any, b: any) =>
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      } else {
        filteredGames.sort(
          (a: any, b: any) =>
            new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      }

      const totalRecords = filteredGames.length;
      const paginatedGames = filteredGames.slice(first, first + rows);
      return { paginatedGames, totalRecords };
    } else {
      throw new Error("API response is not an array");
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};