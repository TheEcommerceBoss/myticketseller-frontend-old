import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMain from "../../components/(headers)/HeaderMain";
import signup_image from "../../assets/(utils)/signup.png"
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function LogoutPage() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  
  logout()

  return (
       <p>
        Logging out
       </p>
    );
}

export default LogoutPage;