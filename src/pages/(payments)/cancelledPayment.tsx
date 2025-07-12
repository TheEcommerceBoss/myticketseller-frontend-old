import React, { useEffect, useState } from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import Footer from "../../components/(footers)/Footer";
import { useLocation } from "react-router-dom";
import ViewEventComponent from "../../components/(events)/ViewEvents";
import { useTheme } from "../../context/ThemeContext";

import Swal from "sweetalert2";
import api from "../../api";
import axios from "axios";
import Cookies from "js-cookie";
import { CheckCircle, LoaderCircleIcon, X } from "lucide-react";
import Confetti from "react-confetti";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CancelledPayments() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <main className="fw-bold">
        <>
          <div className="bg-black min-h-screen flex flex-col items-center justify-center">
            <div className="bg-[#121212] max-w-2xl flex flex-col items-center justify-center p-[3rem] py-[5rem] rounded-2xl">
              <div className="p-2 mb-[2rem] bg-white rounded-[50%]">
                <X size={50} className="" color="red" />
              </div>
              <h5 className="text-center text-2xl mb-5 text-white">
                Payment Failed
              </h5>
              <h5 className="text-center text-lg text-white">
                Kindly click the "X" icon at the top right of your screen to
                close this popup
              </h5>
            </div>
          </div>
        </>
      </main>
    </div>
  );
}

export default CancelledPayments;
