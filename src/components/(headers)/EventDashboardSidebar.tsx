/* eslint-disable react/prop-types */
import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import {
	Barcode,
	ChartPie,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	DollarSign,
	Home,
	ListIcon,
	Mail,
	Megaphone,
	QrCode,
	Send,
	Ticket,
	User,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import logoDark from "../../assets/(site_assets)/logo-dark.png";
import logo from "../../assets/(site_assets)/logo.png";
import { useTheme } from "../../context/ThemeContext";
import { sidebarData } from "../../lib/data";

const SideBar = ({
	isOpen,
	toggleSidebar,
}: {
	isOpen: boolean;
	toggleSidebar: any;
}) => {
	const { id } = useParams();
	const { theme } = useTheme();
	const location = useLocation();

	// State for expanded menu items
	const [salesExpanded, setSalesExpanded] = useState(false);
	const [scanningExpanded, setScanningExpanded] = useState(false);
	const [graphicalExpanded, setGraphicalExpanded] = useState(false);
	const [manualExpanded, setManualExpanded] = useState(false);
	const [paymentExpanded, setPaymentExpanded] = useState(false);
	const [referralExpanded, setReferralExpanded] = useState(false);
	const [guestListExpanded, setGuestListExpanded] = useState(false);
	const [subscriberExpanded, setSubscriberExpanded] = useState(false);

	const NavItem = ({ icon, text, link, active }: any) => (
		<Link to={link}>
			<div
				className={`flex items-center space-x-3 pl-[.2rem] pr-4 py-1 cursor-pointer transition-colors duration-200
          ${
				active
					? theme === "dark"
						? "bg-[#222]"
						: "bg-opacity-10 text-[#040171] font-semibold"
					: theme === "dark"
					? "text-white hover:bg-[#222]"
					: "text-gray-600 hover:bg-gray-100"
			}
          ${!isOpen ? "justify-center" : ""}`}
			>
				<div
					className={`w-[.5rem] h-[2.8rem] mr-4 rounded-r-[5rem] ${
						active ? "bg-[#040171]" : "bg-transparent"
					}`}
				></div>
				<div
					className={`${
						!isOpen
							? "w-8 h-8 flex items-center justify-center"
							: ""
					}`}
				>
					{icon}
				</div>
				{isOpen && <span className="transition-opacity">{text}</span>}
			</div>
		</Link>
	);
	const DropdownNavItem = ({ icon, text, active, onClick }) => (
		<button className="block w-full" onClick={onClick}>
			<div
				className={`flex items-center space-x-3 pl-[.2rem] pr-4 py-1 cursor-pointer transition-colors duration-200 w-full
          ${
				active
					? theme === "dark"
						? "bg-[#222]"
						: "bg-opacity-10 text-[#040171] font-semibold"
					: theme === "dark"
					? "text-white hover:bg-[#222]"
					: "text-gray-600 hover:bg-gray-100"
			}
          ${!isOpen ? "justify-center" : ""}`}
			>
				<div
					className={`w-[.5rem] h-[2.8rem] mr-4 rounded-r-[5rem] bg-transparent`}
				></div>
				<div
					className={`${
						!isOpen
							? "w-8 h-8 flex items-center justify-center"
							: ""
					}`}
				>
					{icon}
				</div>
				{isOpen && <span className="transition-opacity">{text}</span>}
				{isOpen && (
					<div>
						<ChevronDown
							size={24}
							className={active && "rotate-180 text-[#040171]"}
						/>
					</div>
				)}
			</div>
		</button>
	);

	return (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={toggleSidebar}
			/>

			<div
				className={`fixed min-h-screen lg:sticky top-0 h-full z-30 transition-all duration-200
        ${theme === "dark" ? "bg-[#121212]" : "bg-white"}
        ${
			isOpen
				? "w-72 translate-x-0"
				: "w-20 -translate-x-full lg:translate-x-0"
		}
        shadow-lg`}
			>
				<div className="flex items-center justify-between p-4">
					<Link
						onClick={() =>
							window.scrollTo({ top: 0, behavior: "smooth" })
						}
						to={"/"}
					>
						<img
							src={theme === "light" ? logo : logoDark}
							className={`transition-all duration-200 ${
								isOpen ? "w-[5rem]" : "w-[5rem]"
							}`}
							alt="Logo"
						/>
					</Link>
					{isOpen && (
						<button
							onClick={toggleSidebar}
							className={`hidden lg:flex rounded-lg outline-none p-2 transition-colors ${
								theme === "light" ? "bg-gray-100" : "bg-[#222]"
							}`}
						>
							{isOpen ? (
								<ChevronLeft size={20} />
							) : (
								<ChevronRight size={20} />
							)}
						</button>
					)}
				</div>

				<nav className="mt-5">
					<NavItem
						icon={<Home size={20} />}
						link={`/dashboard/event/${id}`}
						text="Dashboard"
						active={location.pathname === `/dashboard/event/${id}`}
					/>
					<NavItem
						icon={<QrCode size={20} />}
						link={`/dashboard/event/${id}/qr-code`}
						text="Event QR Code"
						active={location.pathname.startsWith(
							`/dashboard/event/${id}/qr-code`
						)}
					/>
					<DropdownNavItem
						icon={<ListIcon size={20} />}
						text="Sales Summary"
						active={salesExpanded}
						onClick={() => setSalesExpanded(!salesExpanded)}
					/>
					<Collapse in={salesExpanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{sidebarData.salesSummary.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					<DropdownNavItem
						icon={<Barcode size={20} />}
						text="Scanning"
						active={scanningExpanded}
						onClick={() => setScanningExpanded(!scanningExpanded)}
					/>
					<Collapse
						in={scanningExpanded}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{sidebarData.scanning.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					<DropdownNavItem
						icon={<ChartPie size={20} />}
						text="Graphical View"
						active={graphicalExpanded}
						onClick={() => setGraphicalExpanded(!graphicalExpanded)}
					/>
					<Collapse
						in={graphicalExpanded}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{sidebarData.graphicalView.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					<DropdownNavItem
						icon={<User size={20} />}
						text="Manual Sales"
						active={manualExpanded}
						onClick={() => setManualExpanded(!manualExpanded)}
					/>
					<Collapse in={manualExpanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{sidebarData.manualSales.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					<NavItem
						icon={<Ticket size={20} />}
						link={`/dashboard/event/${id}/ticket-orders`}
						text="Ticket Display Order"
						active={
							location.pathname ===
							`/dashboard/event/${id}/ticket-orders`
						}
					/>
					<NavItem
						icon={<DollarSign size={20} />}
						link={`/dashboard/event/${id}/refund-requests`}
						text="Refund Request"
						active={
							location.pathname ===
							`/dashboard/event/${id}/refund-requests`
						}
					/>
					{/* <NavItem
						icon={<Star size={20} />}
						link={`/dashboard/event/${id}/refund-requests`}
						text="Customer Review"
						active={
							location.pathname ===
							`/dashboard/event/${id}/refund-requests`
						}
					/> */}
					<DropdownNavItem
						icon={<DollarSign size={20} />}
						text="Payment Details"
						active={paymentExpanded}
						onClick={() => setPaymentExpanded(!paymentExpanded)}
					/>
					<Collapse in={paymentExpanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{sidebarData.paymentDetails.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					<DropdownNavItem
						icon={<Megaphone size={20} />}
						text="Referral"
						active={referralExpanded}
						onClick={() => setReferralExpanded(!referralExpanded)}
					/>
					<Collapse
						in={referralExpanded}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{sidebarData.referral.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					<DropdownNavItem
						icon={<ListIcon size={20} />}
						text="Guest List"
						active={guestListExpanded}
						onClick={() => setGuestListExpanded(!guestListExpanded)}
					/>
					<Collapse
						in={guestListExpanded}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{sidebarData.guestList.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse>
					{/* <DropdownNavItem
						icon={<Mail size={20} />}
						text="Subscriber Emails"
						active={subscriberExpanded}
						onClick={() =>
							setSubscriberExpanded(!subscriberExpanded)
						}
					/>
					<Collapse
						in={subscriberExpanded}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{sidebarData.subscriberEmails.map((item, index) => (
								<ListItem key={index} sx={{ py: 0.5, px: 0 }}>
									<ListItemText
										sx={{
											py: 0.5,
											transition: "background-color 0.2s",
											":hover": { bgcolor: "#f3f4f6" },
										}}
									>
										<Link
											to={item.link.replace(":id", id)}
											className="block ml-8 text-[0.85rem]"
										>
											{item.text}
										</Link>
									</ListItemText>
								</ListItem>
							))}
						</List>
					</Collapse> */}
					<NavItem
						icon={<Send size={20} />}
						link={`/dashboard/event/${id}/send-emails-to-attendees`}
						text="Send Emails to Attendes"
						active={
							location.pathname ===
							`/dashboard/event/${id}/send-emails-to-attendees`
						}
					/>
				</nav>
			</div>
		</>
	);
};

export default SideBar;
