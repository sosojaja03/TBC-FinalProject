import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";
import { Session } from "@supabase/supabase-js";

// Define the user type based on your Supabase user data
export interface User {
  id: string;
  email: string;
  name: string;
  session: Session | null;
  avatarUrl?: string;
}

// Define the context value type with separate user and setUser types
interface AuthContextType {
  user: User | null;
  handleSetUser: (session: Session | null) => void; // Function that accepts Session
  loading?: boolean;
}

// Create the context with an initial type-safe value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSetUser: () => {},
  loading: false,
});

// Custom hook for using the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  const handleSetUser = (session: Session | null) => {
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.user_metadata?.name || "",
        session: session,
      });
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
