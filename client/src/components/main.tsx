"use client";
import { UserProvider } from "@/contexts/user-context";
import { ReactNode } from "react";
const Main = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main className={className}>
      <UserProvider>{children}</UserProvider>
    </main>
  );
};
export default Main;
