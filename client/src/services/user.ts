import { useMutation } from "react-query";
import api from "./api";

export const createUser = async (payload: any) => {
  const result = await api.post("/user", payload);

  return result;
};

export const auth = async (payload: { email: string; password: string }) => {
  const result = await api.post("/user/login", payload);

  return result;
};

export const useCreateUser = () => useMutation(createUser);

export const useAuth = () => useMutation(auth);
