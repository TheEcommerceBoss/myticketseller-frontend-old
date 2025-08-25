import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IPInfo from 'ip-info-react';
import { GoogleMapsProvider } from "./components/GoogleMapsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./pages/(auth)/Login";
import LogoutPage from "./pages/(auth)/logout";
import SignupPage from "./pages/(auth)/register";
import AffiliatesPage from "./pages/(dashboard)/AffiliatesPage";
import CompletedCreation from "./pages/(dashboard)/CompletedCreation";
import CreateEvent from "./pages/(dashboard)/createEvent";
// import Dashboard from "./pages/(dashboard)/Dashboard";
import Dashboard2 from "./revamp/pages/Dashboard2";
import EventDashboard from "./pages/(dashboard)/EventDashboard";
import EventsInfo from "./pages/(dashboard)/Info";
import ManageEvent from "./pages/(dashboard)/manageEvent";
import ModifyScanner from "./pages/(dashboard)/ModifyScanner";
import MyTicketsPage from "./pages/(dashboard)/MyTickets";
import PaymentSettings from "./pages/(dashboard)/paymentSettings";
import ScanManager from "./pages/(dashboard)/ScanManager";
import ScannerPage from "./pages/(dashboard)/Scanner";
import Settings from "./pages/(dashboard)/Settings";
import SupportPage from "./pages/(dashboard)/Support";
import WalletPage from "./pages/(dashboard)/wallet";
import AddReferral from "./pages/(event-dashboard)/referral/AddReferral";
import ReferralPayout from "./pages/(event-dashboard)/referral/ReferralPayout";
import ViewOrder from "./pages/(event-dashboard)/referral/ViewOrder";
import ViewReferral from "./pages/(event-dashboard)/referral/ViewReferrals";
import FindEvent from "./pages/(events)/FindEvent";
import SearchEvent from "./pages/(events)/SearchEvent";
import ViewEvent from "./pages/(events)/ViewEvent";
import AboutUs from "./pages/(landing)/About";
import ContactPage from "./pages/(landing)/Contact";
import LandingPage from "./pages/(landing)/Landing";
import PricingPage from "./pages/(landing)/Pricing";
import Privacy from "./pages/(landing)/Privacy";
import Terms from "./pages/(landing)/Terms";
import CancelledPayments from "./pages/(payments)/cancelledPayment";
import ValidatePayment from "./pages/(payments)/validatePayment";
import NotFound from "./pages/others/NotFound";
import ReferralPayoutHistory from "./pages/(event-dashboard)/referral/ReferralPayoutHistory";
import EditEvent from "./pages/(dashboard)/editEvent";
import Complimentary from "./pages/(event-dashboard)/sales-summary/Complimentary";

import SpecificReferral from "./pages/(event-dashboard)/referral/SpecificReferral";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/(dashboard)/dashboard";
import ProfilePage from "./pages/(dashboard)/ProfilePage";
import ChangePassword from "./pages/(dashboard)/ChangePassword";
import MyEarnings from "./pages/(dashboard)/MyEarnings";
import UpdateAnalytics from "./pages/(dashboard)/UpdateAnalytics";
import OrganizerProfile from "./pages/(dashboard)/OrganizerProfile";
import AddNewOrganizer from "./pages/(dashboard)/AddNewOrganizer";
import EventQRCode from "./pages/(event-dashboard)/EventQRCode";
import OrderListing from "./pages/(event-dashboard)/sales-summary/OrderListing";
import Attendees from "./pages/(event-dashboard)/sales-summary/Attendees";
import Checkins from "./pages/(event-dashboard)/sales-summary/Checkins";
import Refunds from "./pages/(event-dashboard)/sales-summary/Refunds";
import Register from "./pages/(event-dashboard)/sales-summary/Register";
import Request from "./pages/(event-dashboard)/sales-summary/Request";
import GuestList from "./pages/(event-dashboard)/GuestList";
import SetupScan from "./pages/(event-dashboard)/scanning/SetupScan";
import ManualScanning from "./pages/(event-dashboard)/scanning/ManualScanning";
import ScanningReport from "./pages/(event-dashboard)/scanning/ScanningReport";
import TicketHistogram from "./pages/(event-dashboard)/TicketHistogram";
import AddManualSales from "./pages/(event-dashboard)/AddManualSales";
import TicketOrders from "./pages/(event-dashboard)/TicketOrders";
import RefundRequestLit from "./pages/(event-dashboard)/RefundRequestList";
import Payout from "./pages/(event-dashboard)/payment-details/Payout";
import MyFollowing from "./pages/(dashboard)/MyFollowing";
import MultiUserAccess from "./pages/(dashboard)/MultiUserAccess";
import PaymentAccount from "./pages/(event-dashboard)/payment-details/PaymentAccount";
import SendEmailsToAttendees from "./pages/(event-dashboard)/SendEmailsToAttendees";

 
function App() {
	return (
		<ThemeProvider>
			<div className="min-h-screen bg-white flex items-center justify-center px-4">
				<div className="max-w-md w-full text-center">
					<div className="mb-8">
						<div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h1 className="text-4xl font-bold text-gray-900 mb-4">Under Upgrade</h1>
						<p className="text-lg text-gray-600 mb-6">
							We're currently upgrading our system to serve you better.
						</p>
						<p className="text-sm text-gray-500 mb-8">
							Thank you for your patience. We'll be back shortly!
						</p>
					</div>
					
					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="text-sm font-semibold text-gray-900 mb-3">What's Coming:</h3>
						<ul className="text-sm text-gray-600 space-y-2">
							<li className="flex items-center">
								<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
								Improved performance
							</li>
							<li className="flex items-center">
								<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
								New features
							</li>
							<li className="flex items-center">
								<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
								Better user experience
							</li>
						</ul>
					</div>
					
					<div className="mt-8">
						<p className="text-xs text-gray-400">
							For urgent matters, please contact support
						</p>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
