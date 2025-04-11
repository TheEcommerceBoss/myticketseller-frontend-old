import { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	InputAdornment,
	Paper,
	Container,
	FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Custom styled components
const Header = styled(Box)(({ theme }) => ({
	backgroundColor: "#000080", // Dark blue
	color: "white",
	padding: theme.spacing(2, 3),
	width: "100%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	marginBottom: theme.spacing(3),
	"& .MuiOutlinedInput-root": {
		borderRadius: theme.spacing(0.5),
	},
}));

const ReferralLinkBox = styled(Paper)(({ theme }) => ({
	backgroundColor: "#f5f5f5",
	padding: theme.spacing(2),
	borderRadius: theme.spacing(0.5),
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(3),
	wordBreak: "break-all",
}));

const SaveButton = styled(Button)(({ theme }) => ({
	backgroundColor: "#000080", // Dark blue
	color: "white",
	borderRadius: theme.spacing(5),
	padding: theme.spacing(1, 4),
	textTransform: "none",
	"&:hover": {
		backgroundColor: "#00006b", // Slightly darker blue
	},
}));

export default function AddReferral() {
	const [referralType, setReferralType] = useState("ticket");
	const [code, setCode] = useState("");
	const [email, setEmail] = useState("");
	const [linkTitle, setLinkTitle] = useState("");
	const [dollarAmount, setDollarAmount] = useState("");
	const [percentageAmount, setPercentageAmount] = useState("");
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	const handleReferralTypeChange = (event) => {
		setReferralType(event.target.value);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

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
							className={`rounded-full outline-none  p-3 ${
								theme === "light"
									? "bg-gray-200  hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
							aria-label="Toggle theme"
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

				<Container maxWidth="md" disableGutters>
					<Header>
						<Typography variant="h6" fontWeight="medium">
							Referral Program
						</Typography>
					</Header>

					<Box sx={{ p: 3, bgcolor: "#fff" }}>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 2,
								mb: 3,
							}}
						>
							<Box sx={{ flex: 1, minWidth: "250px" }}>
								<Typography
									variant="body1"
									fontWeight="medium"
									sx={{ mb: 1 }}
								>
									Code
								</Typography>
								<StyledTextField
									fullWidth
									placeholder="Enter Code"
									variant="outlined"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>
							</Box>
							<Box sx={{ flex: 1, minWidth: "250px" }}>
								<Typography
									variant="body1"
									fontWeight="medium"
									sx={{ mb: 1 }}
								>
									Email
								</Typography>
								<StyledTextField
									fullWidth
									placeholder="Enter Email"
									variant="outlined"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Box>
						</Box>

						<Box sx={{ mb: 3 }}>
							<Typography
								variant="body1"
								fontWeight="medium"
								sx={{ mb: 1 }}
							>
								Create a unique link
							</Typography>
							<StyledTextField
								fullWidth
								placeholder="Enter link title"
								variant="outlined"
								value={linkTitle}
								onChange={(e) => setLinkTitle(e.target.value)}
							/>
						</Box>

						<FormControl
							component="fieldset"
							sx={{ width: "100%" }}
						>
							<RadioGroup
								row
								aria-label="referral-type"
								name="referral-type"
								value={referralType}
								onChange={handleReferralTypeChange}
								sx={{ justifyContent: "space-between", mb: 3 }}
							>
								<FormControlLabel
									value="ticket"
									control={
										<Radio
											sx={{
												color: "#999",
												"&.Mui-checked": {
													color: "#3498db",
												},
											}}
										/>
									}
									label="Referral per ticket"
								/>
								<FormControlLabel
									value="order"
									control={
										<Radio
											sx={{
												color: "#999",
												"&.Mui-checked": {
													color: "#3498db",
												},
											}}
										/>
									}
									label="Referral per order"
								/>
								<FormControlLabel
									value="fixed"
									control={
										<Radio
											sx={{
												color: "#999",
												"&.Mui-checked": {
													color: "#3498db",
												},
											}}
										/>
									}
									label="Fixed amount"
								/>
							</RadioGroup>
						</FormControl>

						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								mb: 4,
							}}
						>
							<TextField
								placeholder="$"
								variant="outlined"
								value={dollarAmount}
								onChange={(e) =>
									setDollarAmount(e.target.value)
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											$
										</InputAdornment>
									),
								}}
								sx={{ width: "200px" }}
							/>
							<Typography
								variant="body1"
								sx={{ mx: 3, color: "#666" }}
							>
								OR
							</Typography>
							<TextField
								placeholder="%"
								variant="outlined"
								value={percentageAmount}
								onChange={(e) =>
									setPercentageAmount(e.target.value)
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											%
										</InputAdornment>
									),
								}}
								sx={{ width: "200px" }}
							/>
						</Box>

						<SaveButton variant="contained" size="large">
							Save
						</SaveButton>

						<Box sx={{ mt: 4 }}>
							<Typography variant="body1" sx={{ mb: 1 }}>
								Promote your link -Use any one of Short Or
								Normal URL
							</Typography>
							<Typography variant="body1" sx={{ mb: 2 }}>
								(Eg: Post on your website, Email to prospective
								event holders)
							</Typography>

							<Typography
								variant="body1"
								fontWeight="medium"
								sx={{ mb: 1 }}
							>
								Referral Link for Promotion
							</Typography>
							<ReferralLinkBox>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									https://www.myticketseller.com/event/view/eoy-party
								</Typography>
							</ReferralLinkBox>
						</Box>
					</Box>
				</Container>
			</div>
		</div>
	);
}
