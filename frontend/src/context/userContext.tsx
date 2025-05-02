// context/userContext.tsx

import { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/api-path";

// Define the shape of the user object
interface User {
  name: string;
  email: string;
  role: string;
  token: string;
}

// Define the shape of the context value
interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

// Default context values
const defaultContextValue: UserContextType = {
  user: null,
  loading: true,
  updateUser: () => {},
  clearUser: () => {},
};

// Create the context with the specified type
const UserContext = createContext<UserContextType>(defaultContextValue);

// UserProvider component to provide context value
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
