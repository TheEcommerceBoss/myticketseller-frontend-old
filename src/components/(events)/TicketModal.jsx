import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, Check, Instagram, Facebook, Twitter, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../api';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import { useTheme } from '../../context/ThemeContext';



const TicketModal = ({ isOpen, onClose, eventTitle, eventDateTime, ticketDetails, eventDetails, eventId }) => {
    const [ticketCounts, setTicketCounts] = useState({});
    const { theme, toggleTheme } = useTheme();

    const [tickets, settickets] = useState([]);
    const [showPaystack, setshowPaystack] = useState(false);
    const [showPaystackLink, setshowPaystackLink] = useState('');

    const [location, setLocation] = useState(null);
    const [conversionRate, setConversionRate] = useState(1);
    const supportedCurrencies = {
        GBP: { name: "British Pound Sterling", countryCode: "GB" },
        CAD: { name: "Canadian Dollar", countryCode: "CA" },
        NGN: { name: "Nigerian Naira", countryCode: "NG" },
        USD: { name: "United States Dollar", countryCode: "US" },
        ZAR: { name: "South African Rand", countryCode: "ZA" },
        XAF: { name: "Central African CFA Franc", countryCode: "CF" },
        CLP: { name: "Chilean Peso", countryCode: "CL" },
        COP: { name: "Colombian Peso", countryCode: "CO" },
        EGP: { name: "Egyptian Pound", countryCode: "EG" },
        EUR: { name: "SEPA", countryCode: "EU" },
        GHS: { name: "Ghanaian Cedi", countryCode: "GH" },
        GNF: { name: "Guinean Franc", countryCode: "GN" },
        KES: { name: "Kenyan Shilling", countryCode: "KE" },
        MWK: { name: "Malawian Kwacha", countryCode: "MW" },
        MAD: { name: "Moroccan Dirham", countryCode: "MA" },
        RWF: { name: "Rwandan Franc", countryCode: "RW" },
        SLL: { name: "Sierra Leonean Leone", countryCode: "SL" },
        TZS: { name: "Tanzanian Shilling", countryCode: "TZ" },
        UGX: { name: "Ugandan Shilling", countryCode: "UG" },
        XOF: { name: "West African CFA Franc BCEAO", countryCode: "WA" },
        ZMW: { name: "Zambian Kwacha", countryCode: "ZM" },
    };

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const currentTime = Date.now();
                const locationData = Cookies.get("locationData");
                const lastSavedTime = Cookies.get("locationDataTime");

                if (locationData && lastSavedTime && currentTime - lastSavedTime > 5 * 60 * 1000) {
                    console.log('cookie')
                    const parsedLocation = JSON.parse(locationData);
                    setLocation(parsedLocation);
                    fetchConversionRate(parsedLocation.currencyCode);  // Fetch conversion rate for the current location
                } else {
                    console.log('api')

                    const ipResponse = await fetch("https://api.ipify.org?format=json");
                    const ipData = await ipResponse.json();
                    const ipAddress = ipData.ip;
                    const response = await fetch(`https://ipwhois.app/json/${ipAddress}`);
                    const data = await response.json();
                    const flagUrl = `https://flagcdn.com/w320/${data.country_code.toLowerCase()}.png`;

                    const locationInfo = {
                        country: data.country,
                        countryCode: data.country_code,
                        cityName: data.city,
                        currency: data.currency,
                        regionName: data.region,
                        timeZone: data.timezone,
                        flag: flagUrl,
                        currencyCode: data.currency_code
                    };
                    console.log(data)


                    Cookies.set("locationData", JSON.stringify(locationInfo), { expires: 1 / 24 });
                    Cookies.set("locationDataTime", currentTime, { expires: 1 / 24 });
                    setLocation(locationInfo);
                    fetchConversionRate(data.currency_code);  // Fetch conversion rate for the detected currency
                }
            } catch (error) {
                console.error("Error fetching location data", error);
            }
        };

        fetchLocationData();
    }, []);

    const fetchConversionRate = async (currencyCode) => {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
            const data = await response.json();
            setConversionRate(data.rates.NGN);  // Store conversion rate to NGN
        } catch (error) {
            console.error("Error fetching conversion rate", error);
        }
    };

    const getSupportedCurrenciesWithLocationFirst = () => {
        if (!location) return supportedCurrencies;

        const prioritized = {
            [location.currencyCode]: {
                name: location.currency,
                countryCode: location.countryCode,
            },
        };

        return {
            ...prioritized,
            ...Object.fromEntries(
                Object.entries(supportedCurrencies).filter(
                    ([key]) => key !== location.currencyCode
                )
            ),
        };
    };

    const handleCountryChange = (event) => {
        const selectedCurrency = event.target.value;

        if (!supportedCurrencies[selectedCurrency]) {
            setLocation({
                country: "United States",
                currency: "United States Dollar",
                currencyCode: "USD",
                countryCode: "US",
                flag: `https://flagcdn.com/w320/us.png`,
            });
            fetchConversionRate("USD");  // Fetch conversion rate for USD
        } else {
            const selectedCountry = supportedCurrencies[selectedCurrency];
            const flagUrl = `https://flagcdn.com/w320/${selectedCountry.countryCode.toLowerCase()}.png`;

            setLocation({
                country: selectedCountry.name,
                currency: selectedCountry.name,
                currencyCode: selectedCurrency,
                countryCode: selectedCountry.countryCode,
                flag: flagUrl,
            });
            fetchConversionRate(selectedCurrency);  // Fetch conversion rate for the selected currency
        }
    };

    useEffect(() => {
        // Initialize ticket counts with 0 for each ticket type
        const initialCounts = {};
        ticketDetails.tickets.forEach(ticket => {
            initialCounts[ticket.ticket_id] = 0;
        });
        // console.log(ticketDetails.tickets)
        setTicketCounts(initialCounts);
    }, [ticketDetails]);

    const handleTicketChange = (ticketName, operation) => {
        setTicketCounts(prevCounts => {
            const currentCount = prevCounts[ticketName] || 0;
            const newCount = operation === 'add' ? currentCount + 1 : Math.max(currentCount - 1, 0); // Prevents negative counts
            return {
                ...prevCounts,
                [ticketName]: newCount
            };
        });
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        // Add the correct suffix for the day
        const daySuffix = (day) => {
            if (day >= 11 && day <= 13) return `${day}th`;
            switch (day % 10) {
                case 1:
                    return `${day}st`;
                case 2:
                    return `${day}nd`;
                case 3:
                    return `${day}rd`;
                default:
                    return `${day}th`;
            }
        };

        return `${daySuffix(day)} ${month}, ${year}`;
    };



    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [showCheckout, setShowCheckout] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    // console.table(tickets)

    useEffect(() => {
        const fetchEventDetails = () => {
            if (ticketDetails && ticketDetails.tickets) {
                settickets(ticketDetails.tickets);
            } else {
                console.error(eventTitle)
                console.error('ticketDetails is not defined or does not contain tickets');
            }
        };

        fetchEventDetails();
    }, [ticketDetails]);

    // console.log(tickets);

    const [marketingConsent, setMarketingConsent] = useState({
        organizer: false,
        platform: false
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        calculateTotal();
    };
    const calculateTotal = () => {
        let subtotal = 0;
        let totalTickets = 0; // Initialize ticket counter

        tickets.forEach(ticket => {
            const ticketCount = ticketCounts[ticket.ticket_id] || 0; // Default to 0 if not set
            subtotal += ticketCount * ticket.price; // Calculate subtotal
            totalTickets += ticketCount; // Count total number of tickets
        });

        const transactionFee = (300 / conversionRate); // Flat transaction fee
        console.log(conversionRate)
        return {
            subtotal: ((subtotal) / conversionRate),
            transactionFee,
            total: ((subtotal + transactionFee) / conversionRate),
            totalTickets // Return total ticket count
        };
    };

    const handleContinue = (e) => {
        e.preventDefault();
        if (calculateTotal().totalTickets > 0) {
            setShowSummary(true);
            setShowCheckout(true);
        } else {
            alert('Atleast One Ticket is required')
        }
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        // setIsConfirmed(true);
        // console.log(ticketCounts)
        try {
            // Replace with your actual API endpoint
            var data = {
                ticketdata: ticketCounts,
                email: formData.email,
                phone_number: formData.phone,
                fullname: formData.name,
                event_id: eventDetails.event_id,
                paymentMethod,
                marketingConsent,
                total: calculateTotal().total,
                currencyCode: location.currencyCode,
                conversionRate: conversionRate
            };
            console.log(data)
            const response = await api.post('/requestTicket', data);
            setIsConfirmed(true);
            console.log(response.data)




            // Check if the link exists in the response
            if (response.data.paystack.data.link) {
                setshowPaystack(true);
                setshowPaystackLink(response.data.paystack.data.link);
            } else {
                Swal.fire('Error', 'Unable to initiate payment', 'error');
            }
            // console.log(response.data)
        } catch (error) {
            // if (error.status == 400) {
            console.error(error.response);
            Swal.fire('Error', error.response.data.error ? error.response.data.error : 'Error', 'error');


        } finally {
            setIsLoading(false);
        }
    };

    const PaymentOptions = () => (
        <div className="grid grid-cols-2 gap-4">
            <label className="relative border rounded-lg text-black p-4 cursor-pointer hover:bg-gray-500/10">
                <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="absolute top-4 right-4"
                />
                <div className="flex flex-col gap-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">💳</span>
                    </div>
                    <span className={`font-medium  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'} `}>Card Payment</span>
                </div>
            </label>
            <label className="relative border rounded-lg text-black p-4 cursor-pointer hover:bg-gray-500/10">
                <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="absolute top-4 right-4"
                />
                <div className="flex flex-col gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">🏦</span>
                    </div>
                    <span className={`font-medium  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'} `}>Bank Transfer</span>
                </div>
            </label>
            <label className="relative border rounded-lg text-black p-4 cursor-pointer hover:bg-gray-500/10">
                <input
                    type="radio"
                    name="payment"
                    value="ussd"
                    checked={paymentMethod === 'ussd'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="absolute top-4 right-4"
                />
                <div className="flex flex-col gap-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600">📱</span>
                    </div>
                    <span className={`font-medium  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'} `}>USSD</span>
                </div>
            </label>
        </div>
    );

    const OrderConfirmation = () => (
        <div className="w-full mx-auto p-6 space-y-8">
            <div className="flex justify-between border-b pb-6 items-center">
                <div className="flex  flex-row items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex flex-col items-center justify-center">
                        <Check className="w-5 font-bold h-5 text-white" />
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                        <h1 className="text-xl text-[#040171]">Thank you for your order!</h1>
                    </div>
                </div>

                <div className="flex justify-end flex-wrap-reverse gap-5 items-end">
                    <Link to={'/dashboard/ticket/all'} className="px-5  hidden md:flex py-2 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                        Take me to my Tickets
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 bg-black bg-opacity-50 rounded-full"
                    >
                        <X className="w-6 h-6 text-white font-bold" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-gray-600 text-xs font-medium">YOU ARE GOING TO</p>
                {/* {console.log(ticketDetails.days[0].event_address)} */}
                <h2 className="text-2xl font-bold text-[#040171]">{eventDetails.event_title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-bold text-black  mb-2">{calculateTotal().totalTickets} TICKET(S) SENT TO</h3>
                    <p className="text-gray-600">{formData.email}</p>
                </div>
                <div>
                    <h3 className="font-bold text-black  mb-2">DATE</h3>
                    <p className="text-gray-600">{formatDate(ticketDetails.days[0].start_day)}</p>
                </div>
                <div>
                    <h3 className="font-bold text-black  mb-2">LOCATION</h3>
                    <p className="text-gray-600">{ticketDetails.days[0].event_address}</p>
                </div>
            </div>
            <div className="flex md:hidden justify-end flex-wrap-reverse gap-5 items-end">
                <Link to={'/dashboard/ticket/all'} className="px-5 py-2 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                    Take me to my Tickets
                </Link>

            </div>

        </div>
    );

    const OrderSummary = () => (
        <>

            <div className="bg-[#000080] h-full text-white rounded-lg p-6">
                <div className="flex flex-col items-end">

                    <button
                        onClick={onClose}
                        className="p-2 bg-white bg-opacity-50 rounded-full"
                    >
                        <X className="w-6 h-6 text-white font-bold" />
                    </button>
                </div>
                <h3 className="text-xl font-normal  lg:pt-[5rem] mb-4">Ticket Order Summary</h3>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Ticket (x{calculateTotal().totalTickets})</span>
                        <span>{location && location.currencyCode}  {calculateTotal().subtotal.toFixed(2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Transaction Fee</span>
                        <span>{location && location.currencyCode}  {calculateTotal().transactionFee.toFixed(2).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-normal">
                        <span>Total</span>
                        <span>{location && location.currencyCode}  {calculateTotal().total.toFixed(2).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </>
    );

    const PaystackModal = ({ paystack }) => (
        <>
            <div className="bg-[#000080] h-full text-white rounded-lg ">
                <div className="flex justify-between p-6">
                    <h3 className="text-xl font-normal mb-4">Checkout</h3>
                    <div className="flex flex-col items-end">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white bg-opacity-50 rounded-full"
                        >
                            <X className="w-6 h-6 text-white font-bold" />
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    <iframe
                        src={paystack}
                        title="Paystack Payment"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        allow="payment"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>
        </>
    );


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
            <div className={` rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto  ${theme === 'dark' ? 'bg-[#121212]' : 'bg-[#fff]'} `}>
                <div className={`${showPaystack ? 'p-1' : 'p-6'}`}>

                    {showPaystack ? (
                        <div className="w-full">
                            <PaystackModal paystack={showPaystackLink} />
                        </div>
                    ) :
                        <div className="flex flex-col md:flex-row gap-6 ">
                            <div className="flex-1">
                                {
                                    isConfirmed ? (
                                        ''
                                    ) :
                                        <>
                                            <div className="flex justify-betweenitems-start ">
                                                {showCheckout ? (
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => setShowCheckout(false)}
                                                            className="p-2 bg-[#000080] bg-opacity-20 rounded-full"
                                                        >
                                                            <ArrowLeft className="w-6 h-6 text-white" />
                                                        </button>

                                                    </div>
                                                ) : (
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-[#040171]">{eventTitle}</h2>
                                                        <p className="text-gray-600">{eventDateTime}</p>
                                                    </div>
                                                )}

                                            </div>

                                            <div className='flex flex-col w-full justify-center items-center relative mb-6 pb-6 border-b '>
                                                <h2 className={`text-2xl font-bold  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#040171]'} `}>Checkout</h2>
                                                <p className="text-gray-600">Login for Faster Experience</p>

                                                <button
                                                    onClick={onClose}
                                                    className="p-2 bg-black bg-opacity-50 absolute right-[.2rem] rounded-full"
                                                >
                                                    <X className="w-6 h-6 text-white font-bold" />
                                                </button>
                                            </div>

                                            <div className={`${theme == 'dark' ? 'bg-black' : 'bg-white'} flex flex-row justify-between my-3 items-center p-4 gap-5`}>
                                                {location && (
                                                    <img src={location.flag} alt="Country Flag" className="object-contain w-[2rem] h-[2rem]" />
                                                )}

                                                <select onChange={handleCountryChange} className="bg-transparent border w-full border-[#ccc] px-2">
                                                    {Object.entries(getSupportedCurrenciesWithLocationFirst()).map(([code, { name, countryCode }]) => (
                                                        <option key={code} selected={location && (code == location.countryCode)} value={code}>
                                                            {name} ({code})
                                                        </option>
                                                    ))}
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                        </>
                                }
                                {!showCheckout ? (
                                    <>
                                        {/* Ticket Selection */}
                                        <div className="mb-8">
                                            <h3 className="text-xl font-semibold mb-4">Select Ticket</h3>

                                            {/* Regular Ticket */}
                                            {tickets.map((ticket, index) => (
                                                <div key={index} className="bg-white shadow-sm border rounded-lg text-black p-4 mb-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="text-lg font-bold text-[#040171]">
                                                                {location && location.currencyCode} {
                                                                    (ticket.price / conversionRate).toLocaleString()
                                                                }
                                                            </p>                                                            <p className="text-gray-600">{ticket.ticket_name} ({ticket.ticket_type})</p>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => handleTicketChange(ticket.ticket_id, 'subtract')}
                                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-8 text-center">{ticketCounts[ticket.ticket_id] || 0}</span>
                                                            <button
                                                                onClick={() => handleTicketChange(ticket.ticket_id, 'add')}
                                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#040171] text-white hover:bg-[#040171]"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}


                                        </div >

                                        {/* Attendee Information Form */}
                                        < form onSubmit={handleContinue} >
                                            <h3 className="text-xl font-semibold mb-4">Attendee Information</h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className={`block  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'}  mb-2 `}>Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Full Name"
                                                        className="w-full p-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className={`block  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'}  mb-2 `}>Email Address</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Email Address"
                                                        className="w-full p-3 border  bg-transparent  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className={`block  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'}  mb-2 `}>Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Phone Number"
                                                        className="w-full p-3 border  bg-transparent  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-orange-600 transition-colors"
                                            >
                                                Continue
                                            </button>
                                        </form>
                                    </>
                                ) : isConfirmed ? (
                                    <OrderConfirmation />
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold">Contact Information</h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className={`block  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'}  mb-2 `}>Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        disabled={true}
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Full Name"
                                                        className="w-full p-3 border bg-gray-100/30 opacity-50  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className={`block  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'}  mb-2 `}>Email Address</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        disabled={true}
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Email Address"
                                                        className="w-full p-3 border bg-gray-100/30 opacity-50  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className={`block  ${theme === 'dark' ? 'text-[#fff]' : 'text-[#000]'}  mb-2 `}>Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        disabled={true}
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Phone Number"
                                                        className="w-full p-3 border bg-gray-100/30 opacity-50  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold">PAYMENT GATEWAYS</h3>
                                            <PaymentOptions />
                                        </div>

                                        <div className="space-y-4">
                                            {/* Marketing consent checkboxes remain the same */}
                                        </div>

                                        <p className="text-gray-400 text-sm">
                                            By selecting Connect, I agree to the My TicketSeller Terms of Service
                                        </p>

                                        <button
                                            onClick={handleCheckout}
                                            disabled={isLoading || !paymentMethod}
                                            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300"
                                        >
                                            {isLoading ? 'Processing...' : 'Checkout'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {showSummary && !isConfirmed && (
                                <div className="md:w-1/3">
                                    <OrderSummary />
                                </div>
                            )}




                        </div>

                    }
                </div>
            </div>
        </div>
    );
};

export default TicketModal;