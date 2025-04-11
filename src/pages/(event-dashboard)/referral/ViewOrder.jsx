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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Eye, Edit3, Trash2 } from "lucide-react";
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

export default function ViewOrder() {
	const [referralOrders, setReferralOrders] = useState([]);
	const [summary, setSummary] = useState({
		orderCount: 0,
		ticketCount: 0,
		orderTotal: 0,
	});
	const [openDialog, setOpenDialog] = useState(false);
	const [currentOrder, setCurrentOrder] = useState({
		id: "",
		name: "",
		code: "",
		pageCount: 0,
		orderCount: 0,
		ticketCount: 0,
		orderTotal: 0,
		referralTotal: 0,
	});
	const [isEditing, setIsEditing] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	const handleOpenDialog = (editing = false, order) => {
		if (editing && order) {
			setCurrentOrder(order);
			setIsEditing(true);
		} else {
			setCurrentOrder({
				id: Math.random().toString(36).substr(2, 9),
				name: "",
				code: "",
				pageCount: 0,
				orderCount: 0,
				ticketCount: 0,
				orderTotal: 0,
				referralTotal: 0,
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
		setCurrentOrder((prev) => ({
			...prev,
			[name]:
				name.includes("Count") || name.includes("Total")
					? Number(value)
					: value,
		}));
	};

	const handleSaveOrder = () => {
		if (isEditing) {
			setReferralOrders((prev) =>
				prev.map((order) =>
					order.id === currentOrder.id ? currentOrder : order
				)
			);
		} else {
			setReferralOrders((prev) => [...prev, currentOrder]);
		}

		// Update summary
		const newSummary = referralOrders.reduce(
			(acc, order) => {
				return {
					orderCount: acc.orderCount + order.orderCount,
					ticketCount: acc.ticketCount + order.ticketCount,
					orderTotal: acc.orderTotal + order.orderTotal,
				};
			},
			{ orderCount: 0, ticketCount: 0, orderTotal: 0 }
		);

		setSummary(newSummary);
		handleCloseDialog();
	};

	const handleDeleteOrder = (id) => {
		setReferralOrders((prev) => prev.filter((order) => order.id !== id));

		// Update summary after deletion
		const newSummary = referralOrders
			.filter((order) => order.id !== id)
			.reduce(
				(acc, order) => {
					return {
						orderCount: acc.orderCount + order.orderCount,
						ticketCount: acc.ticketCount + order.ticketCount,
						orderTotal: acc.orderTotal + order.orderTotal,
					};
				},
				{ orderCount: 0, ticketCount: 0, orderTotal: 0 }
			);

		setSummary(newSummary);
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
					{/* Referral Orders Table */}
					<StyledTableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							aria-label="referral orders table"
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
										Page Count
									</StyledTableCell>
									<StyledTableCell>
										Order Count
									</StyledTableCell>
									<StyledTableCell>
										Ticket Count
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
								{referralOrders.length > 0 ? (
									referralOrders.map((order) => (
										<TableRow key={order.id}>
											<StyledTableCell>
												{order.id}
											</StyledTableCell>
											<StyledTableCell>
												{order.name}
											</StyledTableCell>
											<StyledTableCell>
												{order.code}
											</StyledTableCell>
											<StyledTableCell>
												{order.pageCount}
											</StyledTableCell>
											<StyledTableCell>
												{order.orderCount}
											</StyledTableCell>
											<StyledTableCell>
												{order.ticketCount}
											</StyledTableCell>
											<StyledTableCell>
												${order.orderTotal.toFixed(2)}
											</StyledTableCell>
											<StyledTableCell>
												$
												{order.referralTotal.toFixed(2)}
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
														sx={{
															color: "#4caf50",
														}}
													>
														<Eye size={20} />
													</IconButton>
													<IconButton
														size="small"
														onClick={() =>
															handleOpenDialog(
																true,
																order
															)
														}
														sx={{
															color: "#1976d2",
														}}
													>
														<Edit3 size={20} />
													</IconButton>
													<IconButton
														size="small"
														onClick={() =>
															handleDeleteOrder(
																order.id
															)
														}
														sx={{
															color: "#d32f2f",
														}}
													>
														<Trash2 size={20} />
													</IconButton>
												</Box>
											</StyledTableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<StyledTableCell
											colSpan={9}
											align="center"
											sx={{ py: 6 }}
										>
											<Typography
												variant="body1"
												color="text.secondary"
											>
												No referral orders found
											</Typography>
										</StyledTableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</StyledTableContainer>

					{/* Summary Table */}
					<StyledTableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							aria-label="summary table"
						>
							<StyledTableHead>
								<TableRow>
									<StyledTableCell>
										Order Count
									</StyledTableCell>
									<StyledTableCell>
										Ticket Count
									</StyledTableCell>
									<StyledTableCell>
										Order Total
									</StyledTableCell>
								</TableRow>
							</StyledTableHead>
							<TableBody>
								<TableRow>
									<StyledTableCell>
										{summary.orderCount}
									</StyledTableCell>
									<StyledTableCell>
										{summary.ticketCount}
									</StyledTableCell>
									<StyledTableCell>
										${summary.orderTotal.toFixed(2)}
									</StyledTableCell>
								</TableRow>
							</TableBody>
						</Table>
					</StyledTableContainer>

					{/* Add/Edit Order Dialog */}
					<Dialog
						open={openDialog}
						onClose={handleCloseDialog}
						maxWidth="md"
						fullWidth
					>
						<DialogTitle>
							{isEditing
								? "Edit Referral Order"
								: "Add New Referral Order"}
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
								<Box sx={{ display: "flex", gap: 2 }}>
									<TextField
										fullWidth
										label="Referral Name"
										name="name"
										value={currentOrder.name}
										onChange={handleInputChange}
									/>
									<TextField
										fullWidth
										label="Referral Code"
										name="code"
										value={currentOrder.code}
										onChange={handleInputChange}
									/>
								</Box>
								<Box sx={{ display: "flex", gap: 2 }}>
									<TextField
										fullWidth
										label="Page Count"
										name="pageCount"
										type="number"
										value={currentOrder.pageCount}
										onChange={handleInputChange}
									/>
									<TextField
										fullWidth
										label="Order Count"
										name="orderCount"
										type="number"
										value={currentOrder.orderCount}
										onChange={handleInputChange}
									/>
									<TextField
										fullWidth
										label="Ticket Count"
										name="ticketCount"
										type="number"
										value={currentOrder.ticketCount}
										onChange={handleInputChange}
									/>
								</Box>
								<Box sx={{ display: "flex", gap: 2 }}>
									<TextField
										fullWidth
										label="Order Total"
										name="orderTotal"
										type="number"
										value={currentOrder.orderTotal}
										onChange={handleInputChange}
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
										value={currentOrder.referralTotal}
										onChange={handleInputChange}
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
								onClick={handleSaveOrder}
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
