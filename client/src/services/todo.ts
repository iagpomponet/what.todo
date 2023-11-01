import { useIsMutating, useMutation, useQuery } from "react-query";
import api from "./api";

const getTodosFromUser = async (userId: string) => {
  const result = await api.get(`/todo/user/${userId}`);

  return result.data.data;
};

const createTodo = async (payload: {
  labels: string[];
  content: string;
  user_id: string;
}) => {
  const result = await api.post("/todo", payload);

  return result;
};

const deleteTodo = async (id: string) => {
  const result = await api.delete(`/todo/${id}`);

  return result.data;
};

interface EditTodoPayload {
  todo_id: string;
  payload: { content: string; completed: boolean };
}

const editTodo = async (payload: EditTodoPayload) => {
  const result = await api.put(`/todo/${payload.todo_id}`, {
    ...payload.payload,
    labels: [],
  });

  return result.data;
};

// Hooks
export const useGetTodos = (userId: string) =>
  useQuery("todos", () => getTodosFromUser(userId), {
    enabled: !!userId,
  });

export const useCreateTodo = (props: any) => useMutation(createTodo, props);
export const useDeleteTodo = (props: any) => useMutation(deleteTodo, props);
export const useEditTodo = (props?: any) => useMutation(editTodo, props);
