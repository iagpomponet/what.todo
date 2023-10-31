"use client";

import { useGetCurrentUser } from "@/services/user";
import { ReactNode, createContext, useContext } from "react";

interface UserContextI {
  userQuery: any;
}

const UserContext = createContext({} as UserContextI);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const userQuery = useGetCurrentUser();

  return (
    <UserContext.Provider
      value={{
        userQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
