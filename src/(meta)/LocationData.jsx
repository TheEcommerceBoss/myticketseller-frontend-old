import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const LocationData = () => {
    const [location, setLocation] = useState(null);
    const [conversionRate, setConversionRate] = useState(null);

    const supportedCurrencies = {
        GBP: { name: "British Pound Sterling", countryCode: "GB" },
        CAD: { name: "Canadian Dollar", countryCode: "CA" },
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
        NGN: { name: "Nigerian Naira", countryCode: "NG" },
        RWF: { name: "Rwandan Franc", countryCode: "RW" },
        SLL: { name: "Sierra Leonean Leone", countryCode: "SL" },
        ZAR: { name: "South African Rand", countryCode: "ZA" },
        TZS: { name: "Tanzanian Shilling", countryCode: "TZ" },
        UGX: { name: "Ugandan Shilling", countryCode: "UG" },
        USD: { name: "United States Dollar", countryCode: "US" },
        XOF: { name: "West African CFA Franc BCEAO", countryCode: "WA" },
        ZMW: { name: "Zambian Kwacha", countryCode: "ZM" },
    };

    useEffect(() => {
        const getLocationData = async () => {
            try {
                const currentTime = Date.now();
                const locationData = Cookies.get("locationData");
                const lastSavedTime = Cookies.get("locationDataTime");

                if (locationData && lastSavedTime && currentTime - lastSavedTime < 5 * 60 * 1000) {
                    setLocation(JSON.parse(locationData));
                } else {
                    const ipResponse = await fetch("https://api.ipify.org?format=json");
                    const ipData = await ipResponse.json();
                    const ipAddress = ipData.ip;

                    const response = await fetch(`https://freeipapi.com/api/json/${ipAddress}`);
                    const data = await response.json();
                    const flagUrl = `https://flagcdn.com/w320/${data.countryCode.toLowerCase()}.png`;

                    const locationInfo = {
                        country: data.countryName,
                        countryCode: data.countryCode,
                        currency: data.currency.name,
                        currencyCode: data.currency.code,
                        flag: flagUrl,
                    };

                    Cookies.set("locationData", JSON.stringify(locationInfo), { expires: 1 / 24 });
                    Cookies.set("locationDataTime", currentTime, { expires: 1 / 24 });
                    setLocation(locationInfo);
                }
            } catch (error) {
                console.error("Error fetching location data", error);
            }
        };

        getLocationData();
    }, []);

    const fetchConversionRate = async (currencyCode) => {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
            const data = await response.json();
            setConversionRate(data.rates.NGN);
        } catch (error) {
            console.error("Error fetching conversion rate", error);
        }
    };

    const handleCountryChange = (event) => {
        const selectedCurrency = event.target.value;

        if (!supportedCurrencies[selectedCurrency]) {
            setLocation({ country: "United States", currency: "United States Dollar", currencyCode: "USD", countryCode: "US" });
            fetchConversionRate("USD");
        } else {
            const selectedCountry = supportedCurrencies[selectedCurrency];

            setLocation({
                country: selectedCountry.name,
                currency: selectedCountry.name,
                currencyCode: selectedCurrency,
                countryCode: selectedCountry.countryCode,
            });
            fetchConversionRate(selectedCurrency);
        }
    };

    return (
        <div>
            {location && (
                <div>
                    <img src={location.flag} alt="Country Flag" className="object-contain w-[2rem] h-[2rem]" />
                    <p>Country: {location.country}</p>
                    <p>Currency: {location.currency} ({location.currencyCode})</p>
                    {conversionRate && <p>Conversion Rate to NGN: ₦{conversionRate.toFixed(2)}</p>}
                </div>
            )}
            <select onChange={handleCountryChange} className="bg-transparent mt-4">
                {Object.entries(supportedCurrencies).map(([code, { name, countryCode }]) => (
                    <option key={code} value={code}>
                        {name} ({countryCode})
                    </option>
                ))}
                <option value="OTHER">Other</option>
            </select>
        </div>
    );
};

export default LocationData;
