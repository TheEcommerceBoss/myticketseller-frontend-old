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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ValidatePayment() {
    const query = useQuery();
    const reference = query.get("tx_ref");
    const trxref = query.get("tx_ref");
    const { theme } = useTheme();
    const [fetchingDataLoading, setFetchingDataLoading] = useState(false);
    const [completed, setcompleted] = useState(false);

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
                Swal.fire("Payment Validated", response.data.paystack.message, "success");
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
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <main className="p-5 fw-bold">
                {completed ? (
                    <h5>Payment has been processed, Please Check your MAIL and click the "X" icon at the top right of your screen to close this popup</h5>
                ) : (
                    <>
                        <h5>Validating Payment</h5>
                        <p>Reference: {reference}</p>
                        <p>Transaction Reference: {trxref}</p>
                        {fetchingDataLoading && <p>Loading...</p>}
                    </>
                )}
            </main>
        </div>
    );
}

export default ValidatePayment;
