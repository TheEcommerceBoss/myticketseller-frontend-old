import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import DashboardHeader from "../../components/(events)/DashboardHeader.jsx";
import SideBar from "../../components/(headers)/EventDashboardSidebar.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { manualSalesApi } from "../../shared/services/api";

export default function SendEmailsToAttendees() {
	const { id } = useParams();
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		subject: "",
		message: "",
		selectTicket: "",
		recipientType: "organizers-only",
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsOpen(window.innerWidth >= 1024);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.subject || !formData.message || !formData.selectTicket) {
			alert("Please fill all required fields.");
			return;
		}

		try {
			setIsSubmitting(true);
			const data = {
				event_id: id,
				subject: formData.subject,
				message: formData.message,
				ticket_id: formData.selectTicket,
				recipient_type: formData.recipientType,
			};
			await manualSalesApi.sendEmails(data);
			alert("Emails sent successfully!");
			setFormData({
				subject: "",
				message: "",
				selectTicket: "",
				recipientType: "organizers-only",
			});
		} catch (err) {
			alert("Failed to send emails. Please try again.");
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const ticketOptions = [
		{ id: "cheque", name: "Pay with Cheque" },
		{ id: "card", name: "Card" },
		{ id: "cash", name: "Cash" },
	];

	return (
		<div
			className={`flex min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

			<div className="flex-1 px-5 py-8 lg:px-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleSidebar}
							className={`rounded-lg outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "bg-[#121212]"
							}`}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
					<div className="flex items-center space-x-4">
						<Link
							to={"/dashboard/event/create"}
							className={`rounded-full outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
							aria-label="Create event"
						>
							<PlusCircle
								color={theme === "light" ? "#040171" : "white"}
								size={20}
							/>
						</Link>
						<button
							onClick={toggleTheme}
							className={`rounded-full outline-none p-3 ${
								theme === "light"
									? "bg-gray-200 hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
							aria-label="Toggle theme"
						>
							{theme === "light" ? (
								<Moon size={20} />
							) : (
								<Sun size={20} />
							)}
						</button>
						<DashboardHeader />
					</div>
				</div>

				<div className="space-y-6">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<div className="bg-[#0a0a80] text-white p-4 rounded-t-lg">
								<h2 className="text-xl font-medium">
									Send Mail to Customers
								</h2>
							</div>
							<div className="p-4 space-y-6 bg-white md:p-8">
								<div className="grid grid-cols-1 gap-6">
									<div>
										<label
											htmlFor="subject"
											className="block mb-2 font-medium"
										>
											Subject
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
											required
										/>
									</div>
									<div>
										<label
											htmlFor="message"
											className="block mb-2 font-medium"
										>
											Message
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2"
											rows={4}
											required
										/>
									</div>
									<div>
										<label
											htmlFor="selectTicket"
											className="block mb-2 font-medium"
										>
											Select Ticket
										</label>
										<select
											name="selectTicket"
											id="selectTicket"
											value={formData.selectTicket}
											onChange={handleInputChange}
											className={`w-full p-3 border border-gray-300 ${
												theme === "dark"
													? "text-white"
													: "text-[#000]"
											} font-normal rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
											required
										>
											<option value="" disabled>
												Select ticket
											</option>
											{ticketOptions.map((ticket) => (
												<option
													key={ticket.id}
													value={ticket.id}
												>
													{ticket.name}
												</option>
											))}
										</select>
									</div>
									<FormControl component="fieldset">
										<FormLabel component="legend">
											Select Mail Recipients
										</FormLabel>
										<RadioGroup
											name="recipientType"
											value={formData.recipientType}
											onChange={handleInputChange}
											className="flex !flex-row text-[#6E6D6D]"
										>
											<FormControlLabel
												value="organizers-only"
												control={<Radio />}
												label="Send Mail to all Customers"
											/>
											<FormControlLabel
												value="all-events"
												control={<Radio />}
												label="Send Mail to selected Customers"
											/>
										</RadioGroup>
									</FormControl>
								</div>
							</div>
						</div>
						<div className="flex justify-end mt-8">
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-[#0a0a80] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#09096e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Sending..." : "Send Emails"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
