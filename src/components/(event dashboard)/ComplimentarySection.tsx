"use client";

import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Link,
	MenuItem,
	Paper,
	Select,
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
import { Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsApi, ticketsApi } from "../../shared/services/api";
import { IEvent } from "../../types";

// Custom styled components

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	marginTop: theme.spacing(3),
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
	color: "#555",
}));

export default function ComplimentarySection() {
	const [showEmailInput, setShowEmailInput] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [complimentaryTickets, setComplimentaryTickets] = useState<any[]>([]);
	const [emailError, setEmailError] = useState("");
	const [event, setEvent] = useState<IEvent | null>(null);
	const [ticketId, setTicketId] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	// const [complimentaryTickets, setComp]
	const { id } = useParams();

	const handleClickHere = () => {
		setShowEmailInput(true);
	};

	useEffect(
		function () {
			if (!id) return;
			async function fetchEvent() {
				const eventResponse = await eventsApi.getEventById(id!);
				setEvent(eventResponse);
				setTicketId(eventResponse.tickets[0].id);
			}
			async function fetchComplimentaries() {
				const res = await ticketsApi.fetchEventComplimentaryTickets(
					id!
				);
				setComplimentaryTickets(res.data);
				setIsLoading(false);
				console.log(res.data);
			}
			fetchEvent();
			fetchComplimentaries();
		},
		[id]
	);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setEmailError("");
	};
	const handleNameChange = (e) => {
		setName(e.target.value);
		setEmailError("");
	};

	function handleChangeTicket(e) {
		setTicketId(e.target.value);
	}

	async function handleSendTicket() {
		if (!id) return;
		const res = await ticketsApi.sendComplimentaryTicket({
			ticket_id: ticketId,
			event_id: id!,
			recipient_email: email,
			recipient_name: name,
		});
		console.log(res);
	}

	const handleDeleteEmail = (id: string) => {
		setComplimentaryTickets(
			complimentaryTickets.filter((item) => item.id !== id)
		);
	};

	const handleResendEmail = (id: string) => {
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

	return (
		<Box sx={{ p: 3 }}>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<CircularProgress size={50} />
				</div>
			) : (
				<>
					{!showEmailInput && complimentaryTickets.length === 0 ? (
						<Typography variant="body1" sx={{ py: 2 }}>
							You have no Complimentary Tickets. Send
							complimentary ticket{" "}
							<Link
								component="button"
								variant="body1"
								onClick={handleClickHere}
								sx={{
									color: "#000080",
									textDecoration: "none",
									fontWeight: "medium",
								}}
							>
								click here!
							</Link>
						</Typography>
					) : (
						<>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-start",
									gap: 2,
									mt: 2,
								}}
							>
								<TextField
									label="Name"
									variant="outlined"
									value={name}
									onChange={handleNameChange}
									error={!!emailError}
									helperText={emailError}
									sx={{ flexGrow: 1 }}
									placeholder="Enter email to send complimentary ticket"
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-start",
									gap: 2,
									mt: 2,
								}}
							>
								<TextField
									label="Email Address"
									variant="outlined"
									value={email}
									onChange={handleEmailChange}
									error={!!emailError}
									helperText={emailError}
									sx={{ flexGrow: 1 }}
									placeholder="Enter email to send complimentary ticket"
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-start",
									gap: 2,
									mt: 2,
								}}
							>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={ticketId}
									label="Ticket"
									onChange={handleChangeTicket}
								>
									{event?.tickets.map((ticket) => {
										return (
											<MenuItem
												value={ticket.id}
												key={ticket.id}
											>
												{ticket.name}
											</MenuItem>
										);
									})}
								</Select>
								<Button
									variant="contained"
									onClick={handleSendTicket}
									sx={{
										bgcolor: "#000080",
										"&:hover": {
											bgcolor: "#00006b",
										},
										height: 56,
										px: 3,
									}}
								>
									Add
								</Button>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "end",
									gap: 2,
									mt: 2,
								}}
							></Box>

							{complimentaryTickets.length > 0 && (
								<StyledTableContainer component={Paper}>
									<Table
										sx={{ minWidth: 650 }}
										aria-label="complimentary tickets table"
									>
										<StyledTableHead>
											<TableRow>
												<StyledTableCell>
													Name
												</StyledTableCell>
												<StyledTableCell>
													Email
												</StyledTableCell>
												<StyledTableCell>
													Sent At
												</StyledTableCell>
												<StyledTableCell>
													Ticket ID
												</StyledTableCell>
												<StyledTableCell>
													Action
												</StyledTableCell>
											</TableRow>
										</StyledTableHead>
										<TableBody>
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
																{item.ticket_id}
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
										</TableBody>
									</Table>
								</StyledTableContainer>
							)}
						</>
					)}
				</>
			)}
		</Box>
	);
}
