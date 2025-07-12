import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import newApi from "../services/api";

export const fetchConversionRate = async (currencyCode) => {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currencyCode}`
    );
    const data = await response.json();
    return data.rates.NGN; // Store conversion rate to NGN
  } catch (error) {
    console.error("Error fetching conversion rate", error);
  }
};

export function useLocationData() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversionRate, setConversionRate] = useState(null);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      setLoading(true);
      try {
        const currentTime = Date.now();
        const locationData = Cookies.get("locationData");
        const lastSavedTime = Cookies.get("locationDataTime");

        if (
          locationData &&
          lastSavedTime &&
          currentTime - lastSavedTime > 5 * 60 * 1000
        ) {
          const parsedLocation = JSON.parse(locationData);
          setLocation(parsedLocation);
          setConversionRate(
            await fetchConversionRate(parsedLocation.currencyCode)
          ); // Fetch conversion rate for the current location
        } else {
          const ipResponse = await newApi.get("/ip");
          const ipData = await ipResponse.data;

          const ipAddress =
            ipData.ip === "127.0.0.1" ? "129.205.124.208" : ipData.ip;
          const response = await axios.get(
            `https://ipwhois.app/json/${ipAddress}`
          );
          const data = await response.data;

          const flagUrl = `https://flagcdn.com/w320/${data.country_code.toLowerCase()}.png`;

          const locationInfo = {
            country: data.country,
            countryCode: data.country_code,
            cityName: data.city,
            currency: data.currency,
            regionName: data.region,
            timeZone: data.timezone,
            flag: flagUrl,
            currencyCode: data.currency_code,
          };

          Cookies.set("locationData", JSON.stringify(locationInfo), {
            expires: 1 / 24,
          });
          Cookies.set("locationDataTime", currentTime, {
            expires: 1 / 24,
          });
          setLocation(locationInfo);
          setConversionRate(await fetchConversionRate(data.currency_code)); // Fetch conversion rate for the detected currency
        }
      } catch (error) {
        console.error("Error fetching location data", error);
        setError(error);
        setLocation(null);
        setConversionRate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  return {
    location,
    error,
    loading,
    conversionRate,
    setLocation,
    setError,

    setConversionRate,
  };
}
