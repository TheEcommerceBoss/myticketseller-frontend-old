"use client";

import { useState } from "react";
import { usersApi } from "../../shared/services/api";
import Swal from "sweetalert2";

const DeleteAccount = ({ setDeleteAccount }) => {
	const [reason, setReason] = useState("");

	const handleDelete = async () => {
		// Handle account deletion logic here
		console.log("Account deletion requested with reason:", reason);
		try {
			await usersApi.deleteUser({ reason });
			Swal.fire({
				icon: "success",
				title: "Account Deleted",
				text: "Your account has been deleted successfully.",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to delete account.",
			});
		}
	};

	return (
		<div className="mx-auto bg-white max-w-7xl">
			<div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
				{/* Header */}
				<div className="bg-[#040171] text-white p-4">
					<h1 className="text-xl font-medium">Delete My Account</h1>
				</div>

				{/* Content */}
				<div className="p-8 bg-white">
					{/* Warning Message */}
					<p className="mb-8 leading-relaxed text-gray-800">
						You are about to delete your account here. If you
						continue, your account will no longer be accessible and
						all history of your account will be removed.
					</p>

					{/* Reason Section */}
					<div className="mb-8">
						<label
							htmlFor="reason"
							className="block mb-4 font-medium text-gray-800"
						>
							Reason
						</label>
						<textarea
							id="reason"
							value={reason}
							onChange={(e) => setReason(e.target.value)}
							className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#040171] focus:border-transparent"
							placeholder="Please tell us why you're deleting your account..."
						/>
					</div>

					{/* Delete Button */}
					<div className="flex justify-center gap-4">
						<button
							onClick={() => setDeleteAccount(false)}
							className="bg-white border border-[#040171] text-[#040171] px-8 py-3 rounded-full font-medium hover:bg-[#09096e]  hover:text-white transition-colors shadow-md"
						>
							Cancel
						</button>
						<button
							onClick={handleDelete}
							className="bg-[#040171] text-white px-8 py-3 rounded-full font-medium hover:bg-[#09096e] transition-colors shadow-md"
						>
							Delete Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteAccount;
