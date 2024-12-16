import apiClient from "../../../../config/apiClient";

export type UpdateUserDTO = {
  files: string[];
  fileName: string;
  hoVaTen: string;
  username: string;
};

export const updateAvatarAndHoVaTenByUsername = async (data: UpdateUserDTO) => {
  const response = await apiClient.post("/api/users/update-avatar-and-ho-va-ten-by-username", data);
  if (response.data.status === "OK") {
    return response.data;
  } else {
    throw new Error("Failed to update avatar and ho va ten");
  }
};