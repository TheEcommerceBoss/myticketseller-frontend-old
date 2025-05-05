import {
	Box,
	CircularProgress,
	Container,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu, Moon, PlusCircle, Send, Sun, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../../../components/(events)/DashboardHeader";
import SideBar from "../../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../../context/ThemeContext";
import { ticketsApi } from "../../../shared/services/api";

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

export default function Complimentary() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const { theme, toggleTheme } = useTheme();
	const [complimentaryTickets, setComplimentaryTickets] = useState([]);
	const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

	useEffect(
		function () {
			if (!id) return;
			async function fetchComplimentaries() {
				const res = await ticketsApi.fetchComplimentaryTickets();
				setComplimentaryTickets(res.data);
				setIsLoading(false);
				console.log(res.data);
			}
			fetchComplimentaries();
		},
		[id]
	);

	const handleDeleteEmail = (id) => {
		setComplimentaryTickets(
			complimentaryTickets.filter((item) => item.id !== id)
		);
	};

	const handleResendEmail = (id) => {
		setComplimentaryTickets(
			complimentaryTickets.map((item) =>
				item.id === id
					? {
							...item,
							sentAt: new Date().toISOString(),
							status: "Sent",
					  }
					: item
			)
		);
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
							Complimentary
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
							aria-label="complimentary tickets table"
						>
							<StyledTableHead>
								<TableRow>
									<StyledTableCell>Name</StyledTableCell>
									<StyledTableCell>Email</StyledTableCell>
									<StyledTableCell>Sent At</StyledTableCell>
									<StyledTableCell>Ticket ID</StyledTableCell>
									<StyledTableCell>Action</StyledTableCell>
								</TableRow>
							</StyledTableHead>
							<TableBody className="juctify-center ">
								{isLoading ? (
									<TableRow>
										<TableCell colSpan={5}>
											<Box className="flex items-center justify-center h-24">
												<CircularProgress size={50} />
											</Box>
										</TableCell>
									</TableRow>
								) : (
									<>
										{complimentaryTickets === 0 ? (
											<TableRow>
												<TableCell colSpan={5}>
													<Box className="flex items-center justify-center h-24 text-base text-center">
														No complimentary tickets
													</Box>
												</TableCell>
											</TableRow>
										) : (
											<>
												{complimentaryTickets.map(
													(item) => (
														<TableRow key={item.id}>
															<StyledTableCell>
																{item.name}
															</StyledTableCell>
															<StyledTableCell>
																{item.email}
															</StyledTableCell>
															<StyledTableCell>
																{
																	new Date().toLocaleString()
																	// item.sentAt
																}
															</StyledTableCell>
															<StyledTableCell>
																<Box
																	sx={{
																		display:
																			"inline-block",
																		bgcolor:
																			"#e8f5e9",
																		color: "#2e7d32",
																		px: 1,
																		py: 0.5,
																		borderRadius: 1,
																		fontSize:
																			"0.875rem",
																	}}
																>
																	{
																		item.ticket_id
																	}
																</Box>
															</StyledTableCell>
															<StyledTableCell>
																<Box
																	sx={{
																		display:
																			"flex",
																		gap: 1,
																	}}
																>
																	<IconButton
																		size="small"
																		onClick={() =>
																			handleResendEmail(
																				item.id
																			)
																		}
																		sx={{
																			color: "#1976d2",
																		}}
																	>
																		<Send
																			size={
																				20
																			}
																		/>
																	</IconButton>
																	<IconButton
																		size="small"
																		onClick={() =>
																			handleDeleteEmail(
																				item.id
																			)
																		}
																		sx={{
																			color: "#d32f2f",
																		}}
																	>
																		<Trash2
																			size={
																				20
																			}
																		/>
																	</IconButton>
																</Box>
															</StyledTableCell>
														</TableRow>
													)
												)}
											</>
										)}
									</>
								)}
							</TableBody>
						</Table>
					</StyledTableContainer>
				</Container>
			</div>
		</div>
	);
}
