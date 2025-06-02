import {
	Calendar,
	CheckCircle,
	CircleAlert,
	FileText,
	ThumbsUp,
	Ticket,
	User,
	UserPlus,
} from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { eventsApi, usersApi } from "../../shared/services/api";

const ProfileDetails = ({ setEditProfile, setDeleteAccount }) => {
	const [userDetails, setUserDetails] = useState();
	const [eventsCreated, setEventsCreated] = useState(0);
	const [totalOrders, setTotalOrders] = useState(0);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDetailsResposnse = await usersApi.getMe();
				const totalOrdersResponse = await usersApi.getTotalOrders();
				const eventsCreatedResponse = await eventsApi.getMyEvents();
				setEventsCreated(eventsCreatedResponse.length);
				setUserDetails(userDetailsResposnse);
				setTotalOrders(totalOrdersResponse);
				// console.log(userDetailsResposnse);
				console.log(totalOrdersResponse);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchData();
	}, []);

	// calculate age fo user from userDetails.dob
	const calculateAge = (dob) => {
		if (!dob) return null;

		const today = new Date();
		const birthDate = new Date(dob);

		// Check if the date is valid
		if (isNaN(birthDate.getTime())) return null;

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		// Adjust age if birthday hasn't occurred this year
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	};

	return (
		<div className="p-6 mx-auto bg-white rounded-lg shadow-sm max-w-7xl">
			<div className="flex flex-col gap-8 md:flex-row">
				{/* Profile Image and Buttons */}
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

				{/* Profile Details */}
				<div className="flex-1">
					{/* Profile Status */}
					<div className="mb-6">
						<div className="flex justify-between mb-1">
							<p className="font-medium">Profile Status</p>
							<div className="bg-[#040171] text-white px-2 py-0.5 rounded text-sm relative">
								69%
								<div className="absolute w-3 h-3 bg-[#040171] rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
							</div>
						</div>
						<div className="w-full h-2 bg-gray-200 rounded-full">
							<div className="h-full w-[69%] bg-[#040171] rounded-full"></div>
						</div>
					</div>

					{/* Name and Role */}
					<h1 className="text-2xl font-bold text-[#040171] mb-1 uppercase">
						{userDetails?.full_name}
					</h1>
					<div className="flex justify-between pb-3 mb-6 border-b">
						<p className="text-gray-700">Admin/ Organizer</p>
						<p className="text-gray-700">
							Account since{" "}
							<span className="text-[#040171]">
								Jul 20, 2024 09:33 AM
							</span>
						</p>
					</div>

					{/* Personal Information */}
					<div className="grid max-w-2xl grid-cols-1 gap-4 mb-12 text-sm sm:text-base">
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">Age</span>
							<span>
								{calculateAge(userDetails?.dob) ?? "Nil"}
							</span>
							{userDetails?.dob ? (
								<div className="flex items-center justify-end text-green-600">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							) : (
								<div className="flex items-center justify-end text-red-600">
									<span>Unverified</span>
									<CircleAlert className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">DOB</span>
							<span>{userDetails?.dob ?? "Nil"}</span>
							{userDetails?.dob ? (
								<div className="flex items-center justify-end text-green-600">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							) : (
								<div className="flex items-center justify-end text-red-600">
									<span>Unverified</span>
									<CircleAlert className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">Mobile No.</span>
							<span>{userDetails?.phone_number ?? "Nil"}</span>

							{userDetails?.phone_number ? (
								<div className="flex items-center justify-end text-green-600">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							) : (
								<div className="flex items-center justify-end text-red-600">
									<span>Unverified</span>
									<CircleAlert className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium">E-Mail</span>
							<span>{userDetails?.email ?? "Nil"}</span>
							{userDetails?.email ? (
								<div className="flex items-center justify-end text-green-600">
									<span>Verified</span>
									<CheckCircle className="w-5 h-5 ml-1" />
								</div>
							) : (
								<div className="flex items-center justify-end text-red-600">
									<span>Unverified</span>
									<CircleAlert className="w-5 h-5 ml-1" />
								</div>
							)}
						</div>
					</div>

					{/* Account Status */}
					<div>
						<h2 className="pb-2 mb-4 text-lg font-medium border-b">
							Account Status
						</h2>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{/* Stats Cards */}
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
								label="All Organizer"
							/>
							<StatCard
								icon={
									<UserPlus className="w-6 h-6 text-[#040171]" />
								}
								count="+2"
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
								count={totalOrders.length}
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
	count: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};
