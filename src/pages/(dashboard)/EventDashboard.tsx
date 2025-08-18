import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  Tab,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Calendar,
  CalendarDays,
  CloudDownload,
  Eye,
  Mail,
  Menu,
  Moon,
  PlusCircle,
  Search,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../../components/(events)/DashboardHeader";
import SideBar from "../../components/(headers)/EventDashboardSidebar";
import { useTheme } from "../../context/ThemeContext";
import ComplimentarySection from "../../components/(event dashboard)/ComplimentarySection";
import AttendeeSection from "../../components/(event dashboard)/AttendeeSection";
import { eventsApi } from "../../shared/services/api";

const EventDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [tabValue, setTabValue] = useState(0);
  const [bottomTabValue, setBottomTabValue] = useState(0);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const { id } = useParams()
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleBottomTabChange = (event, newValue) => {
    setBottomTabValue(newValue);
  };

  const [successfulTransactions, setSuccessfulTransactions] = useState([])
  const [resendingEmails, setResendingEmails] = useState({})
  const handleResendEmails = async (transactionId: string) => {
    try {
      setResendingEmails(prev => ({ ...prev, [transactionId]: true }))
      await eventsApi.resendTransactionEmails(transactionId)
      alert('Ticket emails resent successfully!')
    } catch (error) {
      console.error('Failed to resend emails:', error)
      alert('Failed to resend emails. Please try again.')
    } finally {
      setResendingEmails(prev => ({ ...prev, [transactionId]: false }))
    }
  }

  useEffect(() => {


    async function fetchDetails() {
      const [successfulTransactionResponse] = await Promise.all([eventsApi.getEventSuccessfulTransactions(id)])
      console.log("successfu transaction", successfulTransactionResponse)
      setSuccessfulTransactions(successfulTransactionResponse)
    }
    fetchDetails()
  }, [])

  console.log(bottomTabValue);

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
      className={`flex min-h-screen ${theme === "dark" ? "bg-[#222]" : "bg-gray-100"
        }`}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 px-5 py-8 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className={`rounded-lg outline-none p-3 ${theme === "light"
                ? "bg-gray-200 hover:bg-gray-100"
                : "bg-[#121212]"
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="hidden text-2xl font-bold lg:flex">
              Event Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to={"/dashboard/event/create"}
              className={`rounded-full outline-none  p-3 ${theme === "light"
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
              className={`rounded-full outline-none p-3 ${theme === "light"
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

        <Box sx={{ width: "100%", bgcolor: "#f9f9f9", p: 3 }}>
          {/* Top Navigation Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "white",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="dashboard tabs"
            >
              <Tab label="Status" />
              <Tab label="Total Sales CAD" />
              <Tab label="Total Sales NGN" />
              <Tab label="Reports" />
            </Tabs>
          </Box>

          {/* Status Section */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                color="#000066"
                fontWeight="bold"
              >
                Status:
              </Typography>
              <Chip
                label="Completed"
                sx={{
                  bgcolor: "#000080",
                  color: "white",
                  borderRadius: "16px",
                  fontWeight: "medium",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                color="#000066"
                fontWeight="bold"
              >
                Page Views:
              </Typography>
              <Chip
                label="0"
                sx={{
                  bgcolor: "#000080",
                  color: "white",
                  borderRadius: "16px",
                  fontWeight: "medium",
                }}
              />
            </Box>
          </Box>

          {/* Download Sales Report Section */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              color="#000066"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Download Sales Report :
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Start Date
                  </Typography>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) =>
                      setStartDate(newValue)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { width: "200px" },
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <Calendar
                                size={20}
                              />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    End Date
                  </Typography>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) =>
                      setEndDate(newValue)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { width: "200px" },
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <Calendar
                                size={20}
                              />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#000080",
                    borderRadius: "20px",
                    px: 4,
                    mt: 3,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#000066",
                    },
                  }}
                >
                  Download
                </Button>
              </LocalizationProvider>
            </Box>
          </Box>

          <Box sx={{ my: 4, borderBottom: "1px solid #e0e0e0" }} />

          {/* Statistics Cards */}
          <Grid container spacing={3}>
            {/* Online Tickets Sold */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    {successfulTransactions.length || 0}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    Online Tickets Sold
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "rgba(100, 100, 255, 0.1)",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarDays
                    style={{
                      color: "#6666ff",
                      fontSize: 28,
                    }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Offline Tickets Sold */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    0
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    Offline Tickets Sold
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "rgba(255, 180, 100, 0.1)",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Users
                    style={{
                      color: "#ff9933",
                      fontSize: 28,
                    }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Tickets Refunded */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    0
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    Tickets Refunded
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "rgba(100, 200, 100, 0.1)",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Users
                    style={{
                      color: "#66cc66",
                      fontSize: 28,
                    }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Total Tickets Sold */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    7
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    Total Tickets Sold
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "rgba(255, 100, 100, 0.1)",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarDays
                    style={{
                      color: "#ff6666",
                      fontSize: 28,
                    }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Tickets Available */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    0
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    Tickets Available
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "rgba(150, 50, 50, 0.1)",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Users
                    style={{
                      color: "#993333",
                      fontSize: 28,
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudDownload size={20} />}
              sx={{
                bgcolor: "#000080",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#000066",
                },
              }}
            >
              Download Purchase Report
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudDownload size={20} />}
              sx={{
                bgcolor: "#000080",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#000066",
                },
              }}
            >
              Download Payout Report
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudDownload size={20} />}
              sx={{
                bgcolor: "#000080",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#000066",
                },
              }}
            >
              Download Will Call Report
            </Button>
            <Button
              variant="contained"
              startIcon={<Eye size={20} />}
              sx={{
                bgcolor: "#000080",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#000066",
                },
              }}
            >
              View attendance Report
            </Button>
          </Box>

          {/* Bottom Navigation Tabs */}
          <Box
            sx={{
              mt: 4,
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "white",
            }}
          >
            <Tabs
              value={bottomTabValue}
              onChange={handleBottomTabChange}
              aria-label="order tabs"
            >
              <Tab label="Orders" />
              <Tab label="Attendees" />
              <Tab label="Checkins" />
              <Tab label="Refunds" />
              <Tab label="Complimentary" />
            </Tabs>
          </Box>

          {/* Export Options and Search */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#666",
                  borderColor: "#ccc",
                  bgcolor: "#f0f0f0",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                    borderColor: "#bbb",
                  },
                }}
              >
                Excel
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#666",
                  borderColor: "#ccc",
                  bgcolor: "#f0f0f0",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                    borderColor: "#bbb",
                  },
                }}
              >
                CSV
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#666",
                  borderColor: "#ccc",
                  bgcolor: "#f0f0f0",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                    borderColor: "#bbb",
                  },
                }}
              >
                PDF
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#666",
                  borderColor: "#ccc",
                  bgcolor: "#f0f0f0",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                    borderColor: "#bbb",
                  },
                }}
              >
                Copy
              </Button>
            </Box>
            <TextField
              placeholder="Search by email or name"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "250px" }}
            />
          </Box>

          {/* Orders Table */}
          {bottomTabValue === 0 && (
            <TableContainer
              component={Paper}
              sx={{ mt: 2, boxShadow: "none" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="orders table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#D9D9D973",
                    }}
                  >
                    <TableCell>Order ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {successfulTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No transactions found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    successfulTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.reference_id || `TXN-${transaction.id}`}</TableCell>
                        <TableCell>{transaction.buyer_email}</TableCell>
                        <TableCell>{transaction.fullname}</TableCell>
                        <TableCell>{transaction.phone_number}</TableCell>
                        <TableCell>${transaction.total_amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.currency_code}</TableCell>
                        <TableCell>{new Date(transaction.purchase_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.status}
                            sx={{
                              bgcolor: transaction.status === 'success' ? "#4caf50" : "#ff9800",
                              color: "white",
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Mail size={16} />}
                            onClick={() => handleResendEmails(transaction.id)}
                            disabled={resendingEmails[transaction.id]}
                            sx={{
                              textTransform: "none",
                              borderColor: "#000080",
                              color: "#000080",
                              "&:hover": {
                                bgcolor: "#000080",
                                color: "white",
                              },
                            }}
                          >
                            {resendingEmails[transaction.id] ? "Sending..." : "Resend Email"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {bottomTabValue === 1 && <AttendeeSection />}
          {bottomTabValue === 2 && (
            <TableContainer
              component={Paper}
              sx={{ mt: 2, boxShadow: "none" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="orders table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#D9D9D973",
                    }}
                  >
                    <TableCell>Barcode</TableCell>
                    <TableCell>Checkin Time</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Name on Tix</TableCell>
                    <TableCell>Operator</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Empty state or would map through orders here */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {bottomTabValue === 3 && (
            <TableContainer
              component={Paper}
              sx={{ mt: 2, boxShadow: "none" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="orders table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#D9D9D973",
                    }}
                  >
                    <TableCell>Order</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Ticket Buyer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Promo Code</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Empty state or would map through orders here */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {bottomTabValue === 4 && <ComplimentarySection />}
        </Box>
      </div>
    </div>
  );
};

export default EventDashboard;

