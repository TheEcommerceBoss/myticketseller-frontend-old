"use client";

import {
	Box,
	Button,
	IconButton,
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Send, Trash2 } from "lucide-react";
import { useState } from "react";

// Custom styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
	borderBottom: "1px solid #e0e0e0",
	"& .MuiTab-root": {
		textTransform: "none",
		minWidth: 120,
		fontWeight: theme.typography.fontWeightRegular,
		color: "#555",
		"&.Mui-selected": {
			color: theme.palette.primary.main,
		},
	},
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	marginTop: theme.spacing(3),
	border: "1px solid #e0e0e0",
	borderRadius: theme.spacing(0.5),
	boxShadow: "none",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	backgroundColor: "#f9f9f9",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(2),
	borderBottom: "1px solid #e0e0e0",
	color: "#555",
}));

export default function ComplimentarySection() {
	// const [tabValue, setTabValue] = useState(4); // Complimentary tab is selected (index 4)
	const [showEmailInput, setShowEmailInput] = useState(false);
	const [email, setEmail] = useState("");
	const [complimentaryEmails, setComplimentaryEmails] = useState([]);
	const [emailError, setEmailError] = useState("");

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleClickHere = () => {
		setShowEmailInput(true);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setEmailError("");
	};

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleAddEmail = () => {
		if (!email.trim()) {
			setEmailError("Email is required");
			return;
		}

		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		// Add email to the list
		const newEmail = {
			id: Date.now().toString(),
			email: email,
			sentAt: new Date().toISOString(),
			status: "Sent",
		};

		setComplimentaryEmails([...complimentaryEmails, newEmail]);
		setEmail("");
		setEmailError("");
	};

	const handleDeleteEmail = (id) => {
		setComplimentaryEmails(
			complimentaryEmails.filter((item) => item.id !== id)
		);
	};

	const handleResendEmail = (id) => {
		setComplimentaryEmails(
			complimentaryEmails.map((item) =>
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
			{/* {tabValue === 4 && ( */}
			<>
				{!showEmailInput && complimentaryEmails.length === 0 && (
					<Typography variant="body1" sx={{ py: 2 }}>
						You have no Complimentary Tickets. Send complimentary
						ticket{" "}
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
				)}

				{(showEmailInput || complimentaryEmails.length > 0) && (
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
								label="Email Address"
								variant="outlined"
								value={email}
								onChange={handleEmailChange}
								error={!!emailError}
								helperText={emailError}
								sx={{ flexGrow: 1 }}
								placeholder="Enter email to send complimentary ticket"
							/>
							<Button
								variant="contained"
								onClick={handleAddEmail}
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

						{complimentaryEmails.length > 0 && (
							<StyledTableContainer component={Paper}>
								<Table
									sx={{ minWidth: 650 }}
									aria-label="complimentary tickets table"
								>
									<StyledTableHead>
										<TableRow>
											<StyledTableCell>
												Email
											</StyledTableCell>
											<StyledTableCell>
												Sent At
											</StyledTableCell>
											<StyledTableCell>
												Status
											</StyledTableCell>
											<StyledTableCell>
												Action
											</StyledTableCell>
										</TableRow>
									</StyledTableHead>
									<TableBody>
										{complimentaryEmails.map((item) => (
											<TableRow key={item.id}>
												<StyledTableCell>
													{item.email}
												</StyledTableCell>
												<StyledTableCell>
													{new Date(
														item.sentAt
													).toLocaleString()}
												</StyledTableCell>
												<StyledTableCell>
													<Box
														sx={{
															display:
																"inline-block",
															bgcolor: "#e8f5e9",
															color: "#2e7d32",
															px: 1,
															py: 0.5,
															borderRadius: 1,
															fontSize:
																"0.875rem",
														}}
													>
														{item.status}
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
																handleResendEmail(
																	item.id
																)
															}
															sx={{
																color: "#1976d2",
															}}
														>
															<Send size={20} />
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
															<Trash2 size={20} />
														</IconButton>
													</Box>
												</StyledTableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</StyledTableContainer>
						)}
					</>
				)}
			</>
			{/* )} */}
		</Box>
	);
}
