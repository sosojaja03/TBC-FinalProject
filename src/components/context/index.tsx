// import React, { createContext, useState, PropsWithChildren } from "react";

// type AuthContectUserType = any;

// export const AuthContext = createContext<AuthContectUserType>(null);

// export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const [user, setUser] = useState<AuthContectUserType>();

//   const handleSetUser = (user: any) => {
//     setUser(user);
//   };
//   return (
//     <AuthContext.Provider value={{ user, handleSetUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";
import { Session } from "@supabase/supabase-js";

// Define the user type based on your Supabase user data
interface User {
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
        handleSetUser, // Provide the session-handling function
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import React, { createContext, useState, PropsWithChildren } from "react";

// // Define the user type based on the expected user structure
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // Add more properties as needed
// }

// // Define the shape of the context value
// interface AuthContextType {
//   user: User | null | undefined;
//   handleSetUser: (user: User | null) => void;
// }

// // Create the context with a default value of `null`
// export const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const handleSetUser = (user: User | null) => {
//     setUser(user);
//   };

//   return (
//     <AuthContext.Provider value={{ user, handleSetUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
