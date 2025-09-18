import { isAxiosError } from "axios";
import api from "../config/axios";

import type { User } from "../types";

export async function getProfile(userId: string) {
  try {
    const { data } = await api.get<User>(`/${userId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
