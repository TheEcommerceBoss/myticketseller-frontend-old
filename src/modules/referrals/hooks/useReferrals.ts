import { useEffect, useState } from "react";
import { referralsApi } from "../../../shared/services/api";

export function useReferrals() {
	const [referrals, setReferrals] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	useEffect(function () {
		async function fetchReferrals() {
			try {
				setLoading(true);
				const referralsData = await referralsApi.getReferrals();
				console.log(referralsData);
				setReferrals(referralsData.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		fetchReferrals();
	}, []);
	return { referrals, loading, error };
}
