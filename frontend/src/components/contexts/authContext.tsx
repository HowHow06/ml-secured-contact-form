"use client";
import userApi from "@/lib/api/userApi";
import { User } from "@/lib/types/base";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type AuthContextType = {
  user: User | null | undefined;
  refreshAuthContext: () => Promise<void>;
};

const defaultContextValue: AuthContextType = {
  user: undefined,
  refreshAuthContext: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const initialized = useRef(false);

  const refreshAuthContext = async () => {
    try {
      const res = await userApi.getProfileFromToken();

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      setUser(null);
      return;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (initialized.current) {
        return;
      }

      initialized.current = true;
      await refreshAuthContext();
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
