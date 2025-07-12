import {
    Box,
    Button,
    ButtonGroup,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu, Moon, PlusCircle, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../../context/ThemeContext";

/// Custom styled components
const Header = styled(Box)(({ theme }) => ({
	backgroundColor: "#000080", // Dark blue
	color: "white",
	padding: theme.spacing(2, 3),
	width: "100%",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	border: "1px solid #e0e0e0",
	borderRadius: theme.spacing(0.5),
	boxShadow: "none",
	marginTop: theme.spacing(3),
}));

const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: "#f9f9f9",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(2),
	borderBottom: "1px solid #e0e0e0",
	color: "#555",
}));

const ExportButton = styled(Button)(() => ({
	backgroundColor: "#f0f0f0",
	color: "#555",
	textTransform: "none",
	borderRadius: 0,
	border: "1px solid #ddd",
	"&:hover": {
		backgroundColor: "#e0e0e0",
	},
}));

export default function ReferralPayoutHistory() {
	const [payoutHistory, setPayoutHistory] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const { theme, toggleTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
	// Sample data for demonstration
	const sampleData = [
		{
			id: "REF-001",
			name: "John Smith",
			paymentType: "Bank Transfer",
			notes: "Monthly payout for June",
			amount: 250.75,
			date: "2023-06-30",
		},
		{
			id: "REF-002",
			name: "Sarah Johnson",
			paymentType: "PayPal",
			notes: "Quarterly bonus",
			amount: 520.0,
			date: "2023-06-15",
		},
		{
			id: "REF-003",
			name: "Michael Brown",
			paymentType: "Check",
			notes: "First payout",
			amount: 125.5,
			date: "2023-06-10",
		},
	];

	// Function to load sample data
	const loadSampleData = () => {
		setPayoutHistory(sampleData);
	};

	// Function to handle search
	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	// Filter data based on search query
	const filteredData = payoutHistory.filter(
		(payout) =>
			payout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			payout.id.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Export functions
	const exportToExcel = () => {
		console.log("Exporting to Excel...");
		// Implementation would go here
	};

	const exportToCSV = () => {
		console.log("Exporting to CSV...");
		// Implementation would go here
	};

	const exportToPDF = () => {
		console.log("Exporting to PDF...");
		// Implementation would go here
	};

	const copyToClipboard = () => {
		console.log("Copying to clipboard...");
		// Implementation would go here
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

				<Container maxWidth="lg" disableGutters>
					<Header>
						<Typography variant="h6" fontWeight="medium">
							Referral Payout History
						</Typography>
					</Header>

					<Box sx={{ p: 3 }}>
						{/* Export and Search Controls */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<ButtonGroup
								variant="outlined"
								aria-label="export options"
							>
								<ExportButton onClick={exportToExcel}>
									Excel
								</ExportButton>
								<ExportButton onClick={exportToCSV}>
									CSV
								</ExportButton>
								<ExportButton onClick={exportToPDF}>
									PDF
								</ExportButton>
								<ExportButton onClick={copyToClipboard}>
									Copy
								</ExportButton>
							</ButtonGroup>

							<TextField
								placeholder="Search by email or name"
								value={searchQuery}
								onChange={handleSearch}
								size="small"
								sx={{ width: "300px" }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton edge="end">
												<Search />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>

						{/* Payout History Table */}
						<StyledTableContainer component={Paper}>
							<Table
								sx={{ minWidth: 650 }}
								aria-label="payout history table"
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
											Payment Type
										</StyledTableCell>
										<StyledTableCell>Notes</StyledTableCell>
										<StyledTableCell>
											Amount
										</StyledTableCell>
										<StyledTableCell>Date</StyledTableCell>
									</TableRow>
								</StyledTableHead>
								<TableBody>
									{filteredData.length > 0 ? (
										filteredData.map((payout) => (
											<TableRow key={payout.id}>
												<StyledTableCell>
													{payout.id}
												</StyledTableCell>
												<StyledTableCell>
													{payout.name}
												</StyledTableCell>
												<StyledTableCell>
													{payout.paymentType}
												</StyledTableCell>
												<StyledTableCell>
													{payout.notes}
												</StyledTableCell>
												<StyledTableCell>
													${payout.amount.toFixed(2)}
												</StyledTableCell>
												<StyledTableCell>
													{new Date(
														payout.date
													).toLocaleDateString()}
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
													No payout history found
												</Typography>
												{payoutHistory.length === 0 && (
													<Button
														variant="outlined"
														size="small"
														onClick={loadSampleData}
														sx={{
															mt: 2,
															textTransform:
																"none",
														}}
													>
														Load Sample Data
													</Button>
												)}
											</StyledTableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</StyledTableContainer>
					</Box>
				</Container>
			</div>
		</div>
	);
}
