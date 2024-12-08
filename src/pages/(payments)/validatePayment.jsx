import React, { useEffect, useState } from "react";
import HeaderMain from "../../components/(headers)/HeaderMain";
import Footer from "../../components/(footers)/Footer";
import { useLocation } from 'react-router-dom';
import ViewEventComponent from "../../components/(events)/ViewEvents";
import { useTheme } from "../../context/ThemeContext";

import Swal from "sweetalert2";
import api from "../../api";
import axios from 'axios';
import Cookies from 'js-cookie';
import { CheckCircle, LoaderCircleIcon } from "lucide-react";
import Confetti from 'react-confetti';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ValidatePayment() {
    const query = useQuery();
    const reference = query.get("trxref");
    const trxref = query.get("trxref");
    const { theme } = useTheme();
    const [fetchingDataLoading, setFetchingDataLoading] = useState(false);
    const [completed, setcompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setFetchingDataLoading(true);
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/validateEvent`,
                    {
                        reference: reference,
                        trxref: trxref,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response.data);
                // handle success, e.g., show a success message
                // Swal.fire("Payment Validated", response.data.paystack.message, "success");
                setcompleted(true)
            } catch (error) {
                console.error(error.response.data.error);
                Swal.fire("Error", error.response.data.error, "error");
            } finally {
                setFetchingDataLoading(false);
            }
        };

        if (reference && trxref) {
            fetchEvents();
        }
    }, [reference, trxref]);

    return (
        <div className={`min-h-screen `}>
            <main className="fw-bold">
                {completed ? (
                    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
                        {showConfetti && <Confetti numberOfPieces={100} />}

                        <div className="bg-[#121212] max-w-2xl flex flex-col items-center justify-center p-[3rem] py-[5rem] rounded-2xl">
                            <div className="p-2 mb-[2rem] bg-white rounded-[50%]">
                                <CheckCircle size={50} color="green" />
                            </div>
                            <h5 className="text-center text-lg text-white">Payment has been processed, Please Check your MAIL and click the "X" icon at the top right of your screen to close this popup</h5>

                        </div>
                    </div>
                ) : (
                    <>


                        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
                            <div className="bg-[#121212] max-w-2xl flex flex-col items-center justify-center p-[3rem] py-[5rem] rounded-2xl">
                                <div className="p-2 mb-[2rem] bg-white rounded-[50%]">
                                     {fetchingDataLoading && (
                                    <LoaderCircleIcon size={50} className="animate-spin" color="orange" />
                                        
                                    )}

                                </div>
                                <h5 className="text-center text-2xl mb-5 text-white">Validating Payment</h5>
                                <h5 className="text-center text-lg text-white">Transaction Reference: {trxref}</h5>

                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default ValidatePayment;
