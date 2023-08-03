import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

export const GoToLogin = () => {
  const { handleLogout } = useUser()

  useEffect(() => {
    handleLogout()
  }, []);
  return <></>;
};
