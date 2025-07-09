import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import AddManualSales from "./pages/(event-dashboard)/AddManualSales.tsx";
import TicketOrders from "./pages/(event-dashboard)/TicketOrders";
import RefundRequestLit from "./pages/(event-dashboard)/RefundRequestList";
import Payout from "./pages/(event-dashboard)/payment-details/Payout";
import MyFollowing from "./pages/(dashboard)/MyFollowing";
import MultiUserAccess from "./pages/(dashboard)/MultiUserAccess";

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/payment-success" element={<ValidatePayment />} />
              <Route path="/payment-cancel" element={<CancelledPayments />} />
              <Route path="/event/find" element={<FindEvent />} />
              <Route path="/event/search/:search" element={<SearchEvent />} />
              <Route
                path="/event/view/:id"
                element={
                  <GoogleMapsProvider>
                    <ViewEvent />
                  </GoogleMapsProvider>
                }
              />
              <Route path="/category/:id" element={<FindEvent />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard2"
                element={
                  <ProtectedRoute>
                    <Dashboard2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/wallet"
                element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/create"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/manage"
                element={
                  <ProtectedRoute>
                    <ManageEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/create/:id"
                element={
                  <ProtectedRoute>
                    <EditEvent manage={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/manage/:id"
                element={
                  <ProtectedRoute>
                    <CreateEvent manage={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/create/:id/payments"
                element={
                  <ProtectedRoute>
                    <PaymentSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/create/:id/info"
                element={
                  <ProtectedRoute>
                    <EventsInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/create/:id/completed"
                element={
                  <ProtectedRoute>
                    <CompletedCreation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/event/:id"
                element={
                  <ProtectedRoute>
                    <EventDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/support"
                element={
                  <ProtectedRoute>
                    <SupportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/ticket/scanner"
                element={
                  <ProtectedRoute>
                    <ScannerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/ticket/all"
                element={
                  <ProtectedRoute>
                    <MyTicketsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/scan"
                element={
                  <ProtectedRoute>
                    <ScanManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/scan/:id"
                element={
                  <ProtectedRoute>
                    <ModifyScanner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/affiliates"
                element={
                  <ProtectedRoute>
                    <AffiliatesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile/my-following"
                element={
                  <ProtectedRoute>
                    <MyFollowing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile/multi-user-access"
                element={
                  <ProtectedRoute>
                    <MultiUserAccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/my-earnings"
                element={
                  <ProtectedRoute>
                    <MyEarnings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/analytics-details"
                element={
                  <ProtectedRoute>
                    <UpdateAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/organizer-profile"
                element={
                  <ProtectedRoute>
                    <OrganizerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/add-new-organizer"
                element={
                  <ProtectedRoute>
                    <AddNewOrganizer />
                  </ProtectedRoute>
                }
              />

              {/* event dashboard routes */}
              <Route
                path="/dashboard/event/:id/qr-code"
                element={
                  <ProtectedRoute>
                    <EventQRCode />
                  </ProtectedRoute>
                }
              />

              {/* Sales summary */}
              <Route
                path="/dashboard/event/:id/orders"
                element={
                  <ProtectedRoute>
                    <OrderListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/attendees"
                element={
                  <ProtectedRoute>
                    <Attendees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/checkins"
                element={
                  <ProtectedRoute>
                    <Checkins />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/refunds"
                element={
                  <ProtectedRoute>
                    <Refunds />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/register"
                element={
                  <ProtectedRoute>
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/request"
                element={
                  <ProtectedRoute>
                    <Request />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/complimentary"
                element={
                  <ProtectedRoute>
                    <Complimentary />
                  </ProtectedRoute>
                }
              />

              {/* scanning */}
              <Route
                path="/dashboard/event/:id/setup-scan-online"
                element={
                  <ProtectedRoute>
                    <SetupScan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/manually-scanning"
                element={
                  <ProtectedRoute>
                    <ManualScanning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/scanning-report"
                element={
                  <ProtectedRoute>
                    <ScanningReport />
                  </ProtectedRoute>
                }
              />

              {/* graphical view */}
              <Route
                path="/dashboard/event/:id/histogram-view"
                element={
                  <ProtectedRoute>
                    <TicketHistogram />
                  </ProtectedRoute>
                }
              />

              {/* manual sales */}
              <Route
                path="/dashboard/event/:id/add-manual-sales"
                element={
                  <ProtectedRoute>
                    <AddManualSales />
                  </ProtectedRoute>
                }
              />

              {/* ticket display order */}
              <Route
                path="/dashboard/event/:id/ticket-orders"
                element={
                  <ProtectedRoute>
                    <TicketOrders />
                  </ProtectedRoute>
                }
              />

              {/* refund request */}
              <Route
                path="/dashboard/event/:id/refund-requests"
                element={
                  <ProtectedRoute>
                    <RefundRequestLit />
                  </ProtectedRoute>
                }
              />

              {/* payment details */}
              <Route
                path="/dashboard/event/:id/payout"
                element={
                  <ProtectedRoute>
                    <Payout />
                  </ProtectedRoute>
                }
              />

              {/* Referrals */}
              <Route
                path="/dashboard/event/:id/add-referral"
                element={
                  <ProtectedRoute>
                    <AddReferral />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/view-referral"
                element={
                  <ProtectedRoute>
                    <ViewReferral />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/view-order"
                element={
                  <ProtectedRoute>
                    <ViewOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/referral-payout"
                element={
                  <ProtectedRoute>
                    <ReferralPayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/referrals/:id/"
                element={
                  <ProtectedRoute>
                    <SpecificReferral />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/referral-payout-history"
                element={
                  <ProtectedRoute>
                    <ReferralPayoutHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/event/:id/guest-list"
                element={
                  <ProtectedRoute>
                    <GuestList />
                  </ProtectedRoute>
                }
              />
              <Route path="/validatePayment/" element={<ValidatePayment />} />
              <Route path="/canceledPayment" element={<CancelledPayments />} />

              <Route
                path="/login"
                element={
                  <UnProtectedRoute>
                    <LoginPage />
                  </UnProtectedRoute>
                }
              />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route
                path="/register"
                element={
                  <UnProtectedRoute>
                    <SignupPage />
                  </UnProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
