import React from "react";
import { useLocalStorage } from "@rehooks/local-storage";

type UserContextType = {
  name?: string;
  role?: string;
  token?: string;
  profilePic?: string;
  setName: (name?: string) => void;
  setRole: (role?: string) => void;
  setToken: (token?: string) => void;
  setProfilePic: (profilePic?: string) => void;
};

export const UserContext = React.createContext<UserContextType>({
  setName: (name?: string) => {},
  setRole: (role?: string) => {},
  setToken: (token?: string) => {},
  setProfilePic: (profilePic?: string) => {},
});

type Props = {
  children: React.ReactNode;
};

function UserProvider({ children }: Props) {
  const [name, setName, deleteName] = useLocalStorage("name");
  const [role, setRole, deleteRole] = useLocalStorage("role");
  const [token, setToken, deleteToken] = useLocalStorage("token");
  const [profilePic, setProfilePic, deleteProfilePic] = useLocalStorage(
    "profilePic"
  );

  return (
    <UserContext.Provider
      value={{
        name,
        role,
        token,
        profilePic,
        setName: (name?: string) => (name ? setName(name) : deleteName()),
        setRole: (role?: string) => (role ? setRole(role) : deleteRole()),
        setToken: (token?: string) => (token ? setToken(token) : deleteToken()),
        setProfilePic: (profilePic?: string) =>
          profilePic ? setProfilePic(profilePic) : deleteProfilePic(),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
