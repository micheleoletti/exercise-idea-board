import React, { PropsWithChildren, useContext } from "react";
import { GenericResponse } from "../models/generic-response";
import { TokenResponse } from "../pages/api/auth/sign-in";

interface AuthContextSchema {
  signIn?: (
    email: string,
    password: string
  ) => Promise<GenericResponse<TokenResponse>>;
  signOut?: () => void;
}

export const AuthContext = React.createContext<AuthContextSchema>({});

export default function AuthProvider({ children }: PropsWithChildren) {
  /**
   * Sign in
   * @param email
   * @param password
   * @returns
   */
  const signIn = (email: string, password: string) => {
    return fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((response: GenericResponse<TokenResponse>) => {
        if (response.success)
          localStorage.setItem("token", response.data!.token);

        return response;
      });
  };

  /**
   * Sign out
   */
  const signOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Shorthand to use auth context */
export function useAuth() {
  return useContext(AuthContext);
}
