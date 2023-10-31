"use client";

import { useMutation, useQuery } from "react-query";
import api from "./api";

const createUser = async (payload: any) => {
  const result = await api.post("/user", payload);

  return result;
};

const auth = async (payload: { email: string; password: string }) => {
  const result = await api.post("/user/login", payload);

  return result;
};

export const getCurrentUser = async () => {
  const result = await api.get("/user/bootstrap");

  return result.data.data;
};

// Hooks
export const useCreateUser = () => useMutation(createUser);
export const useAuth = () => useMutation(auth);
export const useGetCurrentUser = () => useQuery("bootstrap", getCurrentUser);
