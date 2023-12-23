import React, { useContext, useEffect } from "react";
import { UserContext } from "./AuthContextWraper";
import { useNavigate } from "react-router-dom";

export default function RedirectUser({ children }) {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData === null) {
      navigate("/");
      return;
    }
  }, [userData]);
  return <>{children}</>;
}
