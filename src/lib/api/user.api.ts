import { apiClient } from "./client";
import type { User, CreateUserDto, UpdateUserDto } from "../../types/user";

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get("/user");
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get(`/user/${id}`);
    return data;
  },

  getByEmail: async (email: string): Promise<User> => {
    const { data } = await apiClient.get(`/user/by-email?email=${email}`);
    return data;
  },

  create: async (
    user: CreateUserDto,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post("/user", user);
    return data;
  },

  update: async (
    id: string,
    user: UpdateUserDto,
  ): Promise<{ success: boolean; message: string; data?: User }> => {
    const { data } = await apiClient.put(`/user/${id}`, user);
    return data;
  },

  delete: async (
    id: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.delete(`/user/${id}`);
    return data;
  },
};
