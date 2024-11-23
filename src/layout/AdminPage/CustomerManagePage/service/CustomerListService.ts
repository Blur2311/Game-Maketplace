import apiClient from "../../../../config/apiClient";
import { User } from "../../../../model/UsersModel";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/api/users/all");
    return response.data.data; // Assuming the data is in the "data" field
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const filterAndSortUsers = (users: User[], searchTerm: string, sortOption: string): User[] => {
  let filteredUsers = users;

  if (searchTerm) {
    filteredUsers = users.filter(user =>
      user.hoVaTen.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOption === "oldest") {
    filteredUsers.sort((a, b) => {
      const dateA = a.joinTime ? new Date(a.joinTime).getTime() : 0;
      const dateB = b.joinTime ? new Date(b.joinTime).getTime() : 0;
      return dateB - dateA; // Đảo ngược logic sắp xếp
    });
  } else if (sortOption === "newest") {
    filteredUsers.sort((a, b) => {
      const dateA = a.joinTime ? new Date(a.joinTime).getTime() : 0;
      const dateB = b.joinTime ? new Date(b.joinTime).getTime() : 0;
      return dateA - dateB; // Đảo ngược logic sắp xếp
    });
  }

  return filteredUsers;
};