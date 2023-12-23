import React, { createContext, useLayoutEffect, useState } from "react";
import checkUser from "../services/auth/firebaseCheckUser";

export const UserContext = createContext();
export function AuthContextWraper({ children }) {
  const [userData, setUserData] = useState("loading");
  useLayoutEffect(() => {
    checkUser(setUserData);
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
