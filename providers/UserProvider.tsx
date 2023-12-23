// Required for client provider to use React hooks
"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

// UserProviderProps interface contains ReactNode children
interface UserProviderProps {
  children: React.ReactNode;
}

// UserProvider function accepts ReactNode children
// from UserProviderProps interface
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return (
    <MyUserContextProvider>
      {children}
    </MyUserContextProvider>
  );
}

export default UserProvider;
