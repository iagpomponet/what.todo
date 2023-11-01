"use client";

import { Avatar, DropdownMenu, Flex, Heading } from "@radix-ui/themes";
import { useUserData } from "@/hooks/user";

import "./Header.styles.scss";

export default function Header() {
  const {
    userQuery: { data: user },
  } = useUserData();

  return (
    <header style={{}} className="header">
      <div className="header__container">
        <div>
          <Heading>What.todo</Heading>
        </div>
        <div className="header__profile">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Flex gap="4" align="center">
                <span>{user?.first_name}</span>
                <Avatar radius="full" src={user?.avatar_url} fallback="A" />
              </Flex>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
              <DropdownMenu.Item color="red">Logout</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
