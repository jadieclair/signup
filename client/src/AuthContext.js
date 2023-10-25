import React, { createContext, useContext, useState } from "react";

// Create a context to manage authentication state
export const AuthContext = createContext();

// AuthProvider component manages authentication state and provides it to its children
export const AuthProvider = ({ children }) => {
  // State variables for email, username, and authentication status
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const setAuthenticated = (isAuthenticated) => {
    setIsAuth(isAuthenticated);
    if (isAuthenticated) {
      alert("Login successful! Welcome back!"); // Show a welcome message upon successful login
    }
  };

  return (
    // Provide email, username, and authentication status to the context
    <AuthContext.Provider
      value={{ userName, setUserName, email, setEmail, isAuth, setIsAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
