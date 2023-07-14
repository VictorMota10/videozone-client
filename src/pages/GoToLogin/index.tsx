import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GoToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);
  return <></>;
};
