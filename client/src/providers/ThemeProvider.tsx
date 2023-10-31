"use client";

import { Theme } from "@radix-ui/themes";

export default function ThemeProvider({ children, ...props }: any) {
  return (
    <Theme style={{ height: "100%" }} {...props}>
      {children}
    </Theme>
  );
}
