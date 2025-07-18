/* eslint-disable react/prop-types */
import {
	Calendar,
	CheckCircle,
	FileText,
	ThumbsUp,
	Ticket,
	User,
	UserPlus,
} from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
	eventsApi,
	usersApi,
	organizerProfileApi,
} from "../../shared/services/api";
import Swal from "sweetalert2";

const ProfileDetails = ({ setEditProfile, setDeleteAccount }: any) => {
	const [userDetails, setUserDetails] = useState();
	const [eventsCreated, setEventsCreated] = useState(0);
	const [totalOrders, setTotalOrders] = useState(0);
	const [followerCount, setFollowerCount] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [
					userDetailsResponse,
					totalOrdersResponse,
					userFollowersResponse,
					organizerProfilesResponse,
					eventsCreatedResponse,
				] = await Promise.all([
					usersApi.getMe(),
					usersApi.getTotalOrders(),
					usersApi.getUserFollowers(),
					organizerProfileApi.getUserOrganizerProfiles(),
					eventsApi.getMyEvents(),
				]);

				setEventsCreated(eventsCreatedResponse?.length);
				setFollowerCount(userFollowersResponse?.data?.length);
				setUserDetails(userDetailsResponse);
				setTotalOrders(totalOrdersResponse.total_orders);
				console.log("Organizer Profiles:", organizerProfilesResponse);
			} catch (error) {
				Swal.fire(error.message, "", "error");
				console.error("Failed to fetch data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const calculateAge = (dob) => {
		if (!dob) return null;

		const today = new Date();
		const birthDate = new Date(dob);

		if (isNaN(birthDate.getTime())) return null;

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	};

	const calculateProfileCompletion = () => {
		if (!userDetails) return 0;

		const fields = [
			userDetails.avatar_url,
			userDetails.email,
			userDetails.prefix,
			userDetails.first_name,
			userDetails.last_name,
			userDetails.phone_number,
			userDetails.dob,
		];

		const filledFields = fields.filter(
			(field) => field !== null && field !== ""
		).length;
		const totalFields = fields.length;
		return Math.round((filledFields / totalFields) * 100);
	};

	const profileCompletionPercentage = calculateProfileCompletion();

	if (loading) {
		return (
			<div className="p-6 mx-auto bg-white rounded-lg shadow-sm max-w-7xl">
				<div className="flex flex-col gap-8 md:flex-row">
					<div className="flex flex-col items-center gap-4">
						<div className="w-40 h-40 bg-gray-200 rounded-full animate-pulse"></div>
						<div className="w-full h-12 bg-gray-200 rounded-full animate-pulse"></div>
						<div className="w-full h-12 bg-gray-200 rounded-full animate-pulse"></div>
					</div>
					<div className="flex-1">
						<div className="mb-6">
							<div className="w-1/4 h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
							<div className="w-full h-2 bg-gray-200 rounded-full animate-pulse"></div>
						</div>
						<div className="w-1/2 h-8 mb-2 bg-gray-200 rounded animate-pulse"></div>
						<div className="flex flex-wrap justify-between pb-3 mb-6 border-b gap-x-4">
							<div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
							<div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
						</div>
						<div className="grid max-w-xl grid-cols-1 gap-4 mb-12">
							{[...Array(4)].map((_, index) => (
								<div
									key={index}
									className="grid grid-cols-3 gap-2"
								>
									<div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
									<div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
									<div className="hidden w-1/4 h-4 bg-gray-200 rounded animate-pulse sm:block"></div>
								</div>
							))}
						</div>
						<div>
							<div className="w-1/3 h-6 mb-4 bg-gray-200 rounded animate-pulse"></div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{[...Array(8)].map((_, index) => (
									<div
										key={index}
										className="flex flex-col items-center justify-center p-4 border rounded-lg border-[#040171] shadow-[0_4px_15px] shadow-[#898989]/10"
									>
										<div className="w-6 h-6 mb-2 bg-gray-200 rounded animate-pulse"></div>
										<div className="w-1/4 h-6 bg-gray-200 rounded animate-pulse"></div>
										<div className="w-1/2 h-4 mt-1 bg-gray-200 rounded animate-pulse"></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 mx-auto bg-white rounded-lg shadow-sm max-w-7xl">
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="flex flex-col items-center gap-4">
					<div className="w-40 h-40 overflow-hidden rounded-full">
						<img
							src={
								userDetails?.avatar_url ??
								"/src/assets/(user)/pfp-placeholder.svg"
							}
							alt="Profile picture"
							width={160}
							height={160}
							className="object-cover w-full h-full"
						/>
					</div>
					<button
						onClick={() => setEditProfile(true)}
						className="w-full py-3 px-6 bg-[#040171] text-white font-medium rounded-full"
					>
						Edit Profile
					</button>
					<button
						onClick={() => setDeleteAccount(true)}
						className="w-full px-6 py-3 font-medium text-white bg-red-600 rounded-full"
					>
						Delete Account
					</button>
				</div>

				<div className="flex-1">
					<div className="mb-6">
						<div className="flex justify-between mb-1">
							<p className="font-medium">Profile Status</p>
						</div>
						<div className="relative w-full h-2 bg-gray-200 rounded-full">
							<div
								className="h-full bg-[#040171] rounded-full"
								style={{
									width: `${profileCompletionPercentage}%`,
								}}
							></div>
							<div
								className="bg-[#040171] text-white px-2 py-0.5 rounded text-sm absolute -top-9"
								style={{
									left: `${profileCompletionPercentage}%`,
									transform: "translateX(-50%)",
								}}
							>
								{profileCompletionPercentage}%
								<div className="absolute w-3 h-3 bg-[#040171] rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
							</div>
						</div>
					</div>

					<h1 className="text-2xl font-bold text-[#040171] mb-1 uppercase">
						{userDetails?.full_name}
					</h1>
					<div className="flex flex-wrap justify-between pb-3 mb-6 text-sm border-b gap-x-4 sm:text-base">
						<p className="text-gray-700">Admin/ Organizer</p>
						<p className="text-gray-700">
							Account since{" "}
							<span className="text-[#040171]">
								Jul 20, 2024 09:33 AM
							</span>
						</p>
					</div>

					<div className="grid max-w-xl grid-cols-1 gap-4 mb-12 text-sm sm:text-base">
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">Age</span>
							<span>{calculateAge(userDetails?.dob) ?? "-"}</span>
							{userDetails?.dob && (
								<div className="items-center justify-end hidden text-green-600 sm:flex">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">DOB</span>
							<span>{userDetails?.dob ?? "-"}</span>
							{userDetails?.dob && (
								<div className="items-center justify-end hidden text-green-600 sm:flex">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">Mobile No.</span>
							<span>{userDetails?.phone_number ?? "-"}</span>
							{userDetails?.phone_number && (
								<div className="items-center justify-end hidden text-green-600 sm:flex">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">E-Mail</span>
							<span>{userDetails?.email ?? "-"}</span>
							{userDetails?.email && (
								<div className="items-center justify-end hidden text-green-600 sm:flex">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
					</div>

					<div>
						<h2 className="pb-2 mb-4 text-lg font-medium border-b">
							Account Status
						</h2>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<StatCard
								icon={
									<Calendar className="w-6 h-6 text-[#040171]" />
								}
								count={eventsCreated}
								label="Events Created"
							/>
							<StatCard
								icon={
									<User className="w-6 h-6 text-[#040171]" />
								}
								count="1"
								label="All Organizers"
							/>
							<StatCard
								icon={
									<UserPlus className="w-6 h-6 text-[#040171]" />
								}
								count={followerCount}
								label="All Followers"
							/>
							<StatCard
								icon={
									<ThumbsUp className="w-6 h-6 text-[#040171]" />
								}
								count="+2"
								label="My Likes"
							/>
							<StatCard
								icon={
									<ThumbsUp className="w-6 h-6 text-[#040171]" />
								}
								count="+2"
								label="Events Likes"
							/>
							<StatCard
								icon={
									<ThumbsUp className="w-6 h-6 text-[#040171]" />
								}
								count="+2"
								label="Following"
							/>
							<StatCard
								icon={
									<FileText className="w-6 h-6 text-[#040171]" />
								}
								count={totalOrders}
								label="Your Total Order"
							/>
							<StatCard
								icon={
									<Ticket className="w-6 h-6 text-[#040171]" />
								}
								count="+2"
								label="Tickets Sold"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;

function StatCard({ icon, count, label }) {
	return (
		<div className="flex flex-col items-center justify-center p-4 text-center border rounded-lg border-[#040171] shadow-[0_4px_15px] shadow-[#898989]/10">
			<div className="mb-2">{icon}</div>
			<div className="text-xl font-semibold">{count}</div>
			<div className="text-sm text-gray-600">{label}</div>
		</div>
	);
}

StatCard.propTypes = {
	icon: PropTypes.node.isRequired,
	count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	label: PropTypes.string.isRequired,
};
