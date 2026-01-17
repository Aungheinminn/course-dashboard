import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../types/auth";
import { JwtHelper } from "../lib/utils/jwtHelper";
import { userApi } from "../lib/api";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const jwtHelper = new JwtHelper();

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    const { id } = jwtHelper.decodeToken(token);

    try {
      const profile = await userApi.getById(id);
      setUser(profile);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
      localStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  });

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, refetchUser: fetchUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
