import React from "react";
import { useLocalStorage } from "@rehooks/local-storage";

type User = {
  name?: string;
  role?: string;
  token?: string;
  profilePic?: string;
};

type UserContextType = {
  name?: string;
  role?: string;
  token?: string;
  profilePic?: string;
  setUser: (user: User | null) => void;
};

export const UserContext = React.createContext<UserContextType>({
  setUser: (user: User | null) => {},
});

type Props = {
  children: React.ReactNode;
};

function UserProvider({ children }: Props) {
  const [user, setUser, deleteUser] = useLocalStorage<User>("user");

  return (
    <UserContext.Provider
      value={{
        name: user?.name,
        role: user?.role,
        token: user?.token,
        profilePic: user?.profilePic,
        setUser: (updatedUser: User | null) =>
          updatedUser ? setUser({ ...user, ...updatedUser }) : deleteUser(),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
