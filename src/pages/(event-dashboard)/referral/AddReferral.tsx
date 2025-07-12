import {
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	FormControlLabel,
	InputAdornment,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../../context/ThemeContext";
import { referralsApi } from "../../../shared/services/api";

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
	const { id } = useParams();
	const [errors, setErrors] = useState({});
	const [referralType, setReferralType] = useState("per_ticket");
	const [code, setCode] = useState("");
	const [email, setEmail] = useState("");
	const [linkTitle, setLinkTitle] = useState("");
	const [fixedAmount, setFixedAmount] = useState("");
	const [percentageAmount, setPercentageAmount] = useState("");
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const [createdReferral, setCreatedReferral] = useState({});
	const [loading, setLoading] = useState(false);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const newErrors = {};
			if (!code.trim()) newErrors.code = "Code is required";
			if (!email.trim()) {
				newErrors.email = "Email is required";
			} else if (!/\S+@\S+\.\S+/.test(email)) {
				newErrors.email = "Invalid email address";
			}
			if (!linkTitle.trim())
				newErrors.linkTitle = "Link title is required";
			if (
				referralType === "fixed" &&
				(!fixedAmount || isNaN(fixedAmount))
			)
				newErrors.fixedAmount = "Enter a valid amount";
			if (
				referralType === "percentage" &&
				(!percentageAmount || isNaN(percentageAmount))
			)
				newErrors.percentageAmount = "Enter a valid percentage";

			setErrors(newErrors);

			if (Object.keys(newErrors).length > 0) {
				return; // Don't submit if there are errors
			}

			// If no errors, proceed with submission
			const payload = {
				code,
				email,
				linkTitle,
				referralType,
				amount:
					referralType === "fixed" ? fixedAmount : percentageAmount,
			};

			console.log("Submitting referral:", payload);
			const referralData = await referralsApi.createReferral({
				commission_amount:
					referralType === "fixed" ? fixedAmount : percentageAmount,
				commission_type: referralType,
				event_ids: [id],
				referral_email: email,
				referral_name: linkTitle,
				unique_identifier: code,
			});
			console.log(referralData);
			setCreatedReferral(referralData.data);
		} catch (error) {
			console.error("MY ERROR", error);
		} finally {
			setLoading(false);
		}
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

				<form onSubmit={handleSubmit}>
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
										onChange={(e) =>
											setCode(e.target.value)
										}
										error={!!errors.code}
										helperText={errors.code}
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
										onChange={(e) =>
											setEmail(e.target.value)
										}
										error={!!errors.email}
										helperText={errors.email}
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
									onChange={(e) =>
										setLinkTitle(e.target.value)
									}
									error={!!errors.linkTitle}
									helperText={errors.linkTitle}
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
									sx={{
										justifyContent: "space-between",
										mb: 3,
									}}
								>
									<FormControlLabel
										value="per_ticket"
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
										value="per_order"
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
									mb: 6,
								}}
							>
								{referralType === "fixed" && (
									<TextField
										placeholder="Fixed amount"
										variant="outlined"
										value={fixedAmount}
										onChange={(e) =>
											setFixedAmount(e.target.value)
										}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													₦
												</InputAdornment>
											),
										}}
										sx={{ width: "200px" }}
										error={!!errors.fixedAmount}
										helperText={errors.fixedAmount}
									/>
								)}

								{(referralType === "per_ticket" ||
									referralType === "per_order") && (
									<TextField
										placeholder="Percentage"
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
										error={!!errors.percentageAmount}
										helperText={errors.percentageAmount}
									/>
								)}
							</Box>

							<SaveButton
								variant="contained"
								size="large"
								type="submit"
							>
								Save
							</SaveButton>

							<Box sx={{ mt: 4 }}>
								<Typography variant="body1" sx={{ mb: 1 }}>
									Promote your link -Use any one of Short Or
									Normal URL
								</Typography>
								<Typography variant="body1" sx={{ mb: 2 }}>
									(Eg: Post on your website, Email to
									prospective event holders)
								</Typography>

								<Typography
									variant="body1"
									fontWeight="medium"
									sx={{ mb: 1 }}
								>
									Referral Link for Promotion
								</Typography>
								<ReferralLinkBox>
									<Link
										to={`/referrals/${createdReferral?.id}`}
									>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											{loading ? (
												<CircularProgress />
											) : (
												createdReferral?.link
											)}
										</Typography>
									</Link>
								</ReferralLinkBox>
							</Box>
						</Box>
					</Container>
				</form>
			</div>
		</div>
	);
}
