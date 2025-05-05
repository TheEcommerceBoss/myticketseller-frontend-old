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
	Button,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	IconButton,
	CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Plus, Edit3, Trash2, Copy } from "lucide-react";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import { Menu, Moon, PlusCircle, Sun, X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReferrals } from "../../../modules/referrals/hooks/useReferrals";
import { referralsApi } from "../../../shared/services/api";

// Custom styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	border: "1px solid #e0e0e0",
	borderRadius: theme.spacing(0.5),
	boxShadow: "none",
}));

const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: "#f9f9f9",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(2),
	borderBottom: "1px solid #e0e0e0",
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

export default function ViewReferral() {
	const [referrals, setReferrals] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [currentReferral, setCurrentReferral] = useState({
		id: "",
		referral_name: "",
		referral_email: "",
		link: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	const { referrals: fetchedReferrals, loading } = useReferrals();

	// const handleReferralTypeChange = (event) => {
	// 	setReferralType(event.target.value);
	// };

	const handleOpenDialog = (editing = false, referral) => {
		if (editing && referral) {
			setCurrentReferral(referral);
			setIsEditing(true);
		} else {
			setCurrentReferral({
				id: Math.random().toString(36).substr(2, 9),
				referral_email: "",
				referral_name: "",
				link: "",
			});
			setIsEditing(false);
		}
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);

		setCurrentReferral((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(currentReferral);
	};

	async function handleEditReferral(id, data) {
		console.log("updating", data);
		const updated = await referralsApi.updateReferral(id, data);
		setCurrentReferral(updated);
	}

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

	const handleDeleteReferral = async (id) => {
		try {
			const deleted = await referralsApi.deleteReferral(id);
			console.log(deleted);
		} catch (err) {
			console.error(err);
		} finally {
			setReferrals((prev) => prev.filter((ref) => ref.id !== id));
		}
	};

	const handleCopyLink = (link) => {
		navigator.clipboard.writeText(link);
		// You could add a toast notification here
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

						<h1 className="hidden text-2xl font-bold lg:flex">
							Referrals
						</h1>
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
					<StyledTableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							aria-label="referrals table"
						>
							<StyledTableHead>
								<TableRow>
									<StyledTableCell>Name</StyledTableCell>
									<StyledTableCell>Email</StyledTableCell>
									<StyledTableCell>Link</StyledTableCell>
									<StyledTableCell>Action</StyledTableCell>
								</TableRow>
							</StyledTableHead>
							<TableBody>
								{loading ? (
									<CircularProgress />
								) : (
									<>
										{fetchedReferrals.length > 0 ? (
											fetchedReferrals.map((referral) => (
												<TableRow key={referral.id}>
													<StyledTableCell>
														{referral.referral_name}
													</StyledTableCell>
													<StyledTableCell>
														{
															referral.referral_email
														}
													</StyledTableCell>
													<StyledTableCell>
														<Box
															sx={{
																display: "flex",
																alignItems:
																	"center",
															}}
														>
															<Typography
																variant="body2"
																sx={{
																	maxWidth:
																		"300px",
																	overflow:
																		"hidden",
																	textOverflow:
																		"ellipsis",
																	whiteSpace:
																		"nowrap",
																}}
															>
																{referral.link}
															</Typography>
															<IconButton
																size="small"
																onClick={() =>
																	handleCopyLink(
																		referral.link
																	)
																}
																sx={{ ml: 1 }}
															>
																<Copy
																	size={20}
																/>
															</IconButton>
														</Box>
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
														</Box>
													</StyledTableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<StyledTableCell
													colSpan={4}
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
									</>
								)}
							</TableBody>
						</Table>
					</StyledTableContainer>

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
									label="Name"
									name="referral_name"
									value={currentReferral.referral_name}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									label="Email"
									name="referral_email"
									type="email"
									value={currentReferral.referral_email}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									label="Link"
									name="link"
									value={currentReferral.link}
									disabled
									onChange={handleInputChange}
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog}>Cancel</Button>
							<Button
								onClick={
									isEditing
										? async () => {
												await handleEditReferral(
													currentReferral.id,
													currentReferral
												);
										  }
										: handleSaveReferral
								}
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
				</Container>
			</div>
		</div>
	);
}
