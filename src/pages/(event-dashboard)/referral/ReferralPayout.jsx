import { useState } from "react";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Eye, Plus, Edit3, Trash2, CreditCard } from "lucide-react";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Custom styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	border: "1px solid #e0e0e0",
	borderRadius: theme.spacing(0.5),
	boxShadow: "none",
	marginBottom: theme.spacing(4),
}));

const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: "#f9f9f9",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(2),
	borderBottom: "1px solid #e0e0e0",
	color: "#555",
}));

const AddButton = styled(Button)(({ theme }) => ({
	backgroundColor: "#000080", // Dark blue
	color: "white",
	borderRadius: theme.spacing(5),
	padding: theme.spacing(1, 4),
	textTransform: "none",
	position: "fixed",
	bottom: theme.spacing(4),
	right: theme.spacing(4),
	"&:hover": {
		backgroundColor: "#00006b", // Slightly darker blue
	},
}));

export default function ReferralPayout() {
	const [referrals, setReferrals] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [openPayoutDialog, setOpenPayoutDialog] = useState(false);
	const [currentReferral, setCurrentReferral] = useState({
		id: "",
		name: "",
		code: "",
		orderTotal: 0,
		referralTotal: 0,
		status: "pending", // pending, paid, cancelled
	});
	const [payoutDetails, setPayoutDetails] = useState({
		amount: 0,
		method: "bank",
		notes: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	const handleOpenDialog = (editing = false, referral = null) => {
		if (editing && referral) {
			setCurrentReferral(referral);
			setIsEditing(true);
		} else {
			setCurrentReferral({
				id: Math.random().toString(36).substr(2, 9),
				name: "",
				code: "",
				orderTotal: 0,
				referralTotal: 0,
				status: "pending",
			});
			setIsEditing(false);
		}
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleOpenPayoutDialog = (referral) => {
		setCurrentReferral(referral);
		setPayoutDetails({
			amount: referral.referralTotal,
			method: "bank",
			notes: "",
		});
		setOpenPayoutDialog(true);
	};

	const handleClosePayoutDialog = () => {
		setOpenPayoutDialog(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentReferral((prev) => ({
			...prev,
			[name]: name.includes("Total")
				? Number.parseFloat(value) || 0
				: value,
		}));
	};

	const handlePayoutInputChange = (e) => {
		const { name, value } = e.target;
		setPayoutDetails((prev) => ({
			...prev,
			[name]: name === "amount" ? Number.parseFloat(value) || 0 : value,
		}));
	};

	const handleSaveReferral = () => {
		if (isEditing) {
			setReferrals((prev) =>
				prev.map((ref) =>
					ref.id === currentReferral.id ? currentReferral : ref
				)
			);
		} else {
			setReferrals((prev) => [...prev, currentReferral]);
		}
		handleCloseDialog();
	};

	const handleProcessPayout = () => {
		// Update the referral status to paid
		const updatedReferral = { ...currentReferral, status: "paid" };
		setReferrals((prev) =>
			prev.map((ref) =>
				ref.id === currentReferral.id ? updatedReferral : ref
			)
		);
		handleClosePayoutDialog();

		// In a real app, you would send this data to your backend
		console.log("Processing payout:", {
			referral: currentReferral,
			payout: payoutDetails,
		});
	};

	const handleDeleteReferral = (id) => {
		setReferrals((prev) => prev.filter((ref) => ref.id !== id));
	};

	const handleViewReferral = (referral) => {
		// View functionality would go here
		console.log("Viewing referral:", referral);
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

				<Container maxWidth="lg" sx={{ py: 4 }}>
					{/* Referrals Table */}
					<StyledTableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							aria-label="referrals payout table"
						>
							<StyledTableHead>
								<TableRow>
									<StyledTableCell>
										Referral ID
									</StyledTableCell>
									<StyledTableCell>
										Referral Name
									</StyledTableCell>
									<StyledTableCell>
										Referral Code
									</StyledTableCell>
									<StyledTableCell>
										Order Total
									</StyledTableCell>
									<StyledTableCell>
										Referral Total
									</StyledTableCell>
									<StyledTableCell>Action</StyledTableCell>
								</TableRow>
							</StyledTableHead>
							<TableBody>
								{referrals.length > 0 ? (
									referrals.map((referral) => (
										<TableRow
											key={referral.id}
											sx={{
												backgroundColor:
													referral.status === "paid"
														? "#f0f7f0"
														: "inherit",
											}}
										>
											<StyledTableCell>
												{referral.id}
											</StyledTableCell>
											<StyledTableCell>
												{referral.name}
											</StyledTableCell>
											<StyledTableCell>
												{referral.code}
											</StyledTableCell>
											<StyledTableCell>
												$
												{referral.orderTotal.toFixed(2)}
											</StyledTableCell>
											<StyledTableCell>
												$
												{referral.referralTotal.toFixed(
													2
												)}
											</StyledTableCell>
											<StyledTableCell>
												<Box
													sx={{
														display: "flex",
														gap: 1,
													}}
												>
													<IconButton
														size="small"
														onClick={() =>
															handleViewReferral(
																referral
															)
														}
														sx={{
															color: "#4caf50",
														}}
													>
														<Eye size={20} />
													</IconButton>
													{referral.status !==
														"paid" && (
														<>
															<IconButton
																size="small"
																onClick={() =>
																	handleOpenPayoutDialog(
																		referral
																	)
																}
																sx={{
																	color: "#ff9800",
																}}
															>
																<CreditCard
																	size={20}
																/>
															</IconButton>
															<IconButton
																size="small"
																onClick={() =>
																	handleOpenDialog(
																		true,
																		referral
																	)
																}
																sx={{
																	color: "#1976d2",
																}}
															>
																<Edit3
																	size={20}
																/>
															</IconButton>
															<IconButton
																size="small"
																onClick={() =>
																	handleDeleteReferral(
																		referral.id
																	)
																}
																sx={{
																	color: "#d32f2f",
																}}
															>
																<Trash2
																	size={20}
																/>
															</IconButton>
														</>
													)}
													{referral.status ===
														"paid" && (
														<Typography
															variant="caption"
															sx={{
																color: "green",
																fontWeight:
																	"bold",
																ml: 1,
															}}
														>
															PAID
														</Typography>
													)}
												</Box>
											</StyledTableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<StyledTableCell
											colSpan={6}
											align="center"
											sx={{ py: 6 }}
										>
											<Typography
												variant="body1"
												color="text.secondary"
											>
												No referrals found
											</Typography>
										</StyledTableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</StyledTableContainer>

					{/* Add Button */}
					<AddButton
						variant="contained"
						startIcon={<Plus />}
						onClick={() => handleOpenDialog()}
					>
						Add
					</AddButton>

					{/* Add/Edit Referral Dialog */}
					<Dialog
						open={openDialog}
						onClose={handleCloseDialog}
						maxWidth="sm"
						fullWidth
					>
						<DialogTitle>
							{isEditing ? "Edit Referral" : "Add New Referral"}
						</DialogTitle>
						<DialogContent>
							<Box
								sx={{
									pt: 1,
									display: "flex",
									flexDirection: "column",
									gap: 2,
								}}
							>
								<TextField
									fullWidth
									label="Referral Name"
									name="name"
									value={currentReferral.name}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Referral Code"
									name="code"
									value={currentReferral.code}
									onChange={handleInputChange}
									margin="normal"
								/>
								<Box sx={{ display: "flex", gap: 2 }}>
									<TextField
										fullWidth
										label="Order Total"
										name="orderTotal"
										type="number"
										value={currentReferral.orderTotal}
										onChange={handleInputChange}
										margin="normal"
										InputProps={{
											startAdornment: (
												<Box
													component="span"
													sx={{ mr: 0.5 }}
												>
													$
												</Box>
											),
										}}
									/>
									<TextField
										fullWidth
										label="Referral Total"
										name="referralTotal"
										type="number"
										value={currentReferral.referralTotal}
										onChange={handleInputChange}
										margin="normal"
										InputProps={{
											startAdornment: (
												<Box
													component="span"
													sx={{ mr: 0.5 }}
												>
													$
												</Box>
											),
										}}
									/>
								</Box>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog}>Cancel</Button>
							<Button
								onClick={handleSaveReferral}
								variant="contained"
								sx={{
									bgcolor: "#000080",
									"&:hover": { bgcolor: "#00006b" },
								}}
							>
								{isEditing ? "Update" : "Save"}
							</Button>
						</DialogActions>
					</Dialog>

					{/* Process Payout Dialog */}
					<Dialog
						open={openPayoutDialog}
						onClose={handleClosePayoutDialog}
						maxWidth="sm"
						fullWidth
					>
						<DialogTitle>Process Payout</DialogTitle>
						<DialogContent>
							<Box
								sx={{
									pt: 1,
									display: "flex",
									flexDirection: "column",
									gap: 2,
								}}
							>
								<Typography variant="body1">
									Processing payout for:{" "}
									<strong>{currentReferral.name}</strong>
								</Typography>

								<TextField
									fullWidth
									label="Payout Amount"
									name="amount"
									type="number"
									value={payoutDetails.amount}
									onChange={handlePayoutInputChange}
									margin="normal"
									InputProps={{
										startAdornment: (
											<Box
												component="span"
												sx={{ mr: 0.5 }}
											>
												$
											</Box>
										),
									}}
								/>

								<FormControl fullWidth margin="normal">
									<InputLabel id="payment-method-label">
										Payment Method
									</InputLabel>
									<Select
										labelId="payment-method-label"
										id="payment-method"
										name="method"
										value={payoutDetails.method}
										label="Payment Method"
										onChange={handlePayoutInputChange}
									>
										<MenuItem value="bank">
											Bank Transfer
										</MenuItem>
										<MenuItem value="paypal">
											PayPal
										</MenuItem>
										<MenuItem value="check">Check</MenuItem>
										<MenuItem value="cash">Cash</MenuItem>
									</Select>
								</FormControl>

								<TextField
									fullWidth
									label="Notes"
									name="notes"
									multiline
									rows={3}
									value={payoutDetails.notes}
									onChange={handlePayoutInputChange}
									margin="normal"
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClosePayoutDialog}>
								Cancel
							</Button>
							<Button
								onClick={handleProcessPayout}
								variant="contained"
								sx={{
									bgcolor: "#4caf50",
									"&:hover": { bgcolor: "#388e3c" },
								}}
							>
								Process Payout
							</Button>
						</DialogActions>
					</Dialog>
				</Container>
			</div>
		</div>
	);
}
