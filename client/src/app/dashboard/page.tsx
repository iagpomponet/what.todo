/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
"use client";

import SideMenu from "@/components/SideMenu/SideMenu";
import TodoItem from "@/components/TodoItem/TodoItem";
// TODO
// Create new todo
// Fetch lables
// Edit todos
// Complete todos
// Profile settings
// Create label
// Logout option and endpoint

import Spinner from "@/components/icons/Spinner";
import { useUserData } from "@/hooks/user";
import { useGetTodos } from "@/services/todo";
import { Flex, Heading } from "@radix-ui/themes";

export default function Dashboard() {
  const {
    userQuery: { data: userData, isLoading },
  } = useUserData();
  const { data: todos, isLoading: todosLoading } = useGetTodos(
    userData?.user_id
  );

  if (isLoading) {
    return (
      <Flex style={{ height: "100%" }} justify="center" align="center">
        <Spinner />
      </Flex>
    );
  }

  if (todosLoading) {
    <Flex style={{ height: "100%" }}>
      <SideMenu />
      <Spinner />
    </Flex>;
  }

  return (
    <Flex style={{ height: "100%" }}>
      <SideMenu />
      <ul style={{ width: "100%", padding: "0 1rem" }}>
        {todos?.length ? (
          todos?.map((todo: any) => {
            return (
              <>
                <TodoItem
                  todo_id={todo.todo_id}
                  content={todo?.content}
                  completed={todo?.completed}
                />
              </>
            );
          })
        ) : (
          <Flex align="center" justify="center" style={{ height: "50%" }}>
            <Heading>No tasks yet :D</Heading>
          </Flex>
        )}
      </ul>
    </Flex>
  );
}
