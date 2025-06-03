/* eslint-disable no-unused-vars */

import { useAppContext } from "../../context/AppContext";
import EventCalendar from "../components/dashboard/EventCalendar";
import OngoingEvents from "../components/dashboard/OngoingEvents";
import SalesChart from "../components/dashboard/SalesChart";
import StatCards from "../components/dashboard/StatsCard";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const Dashboard = () => {
	const { isMenuOpen } = useAppContext();

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />

			<div className="flex flex-col flex-1 overflow-hidden">
				<Header />

				<main className="flex-1 p-6 overflow-y-auto bg-neutral-50">
					<div className="mx-auto space-y-6 max-w-7xl">
						<StatCards />

						<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
							<div className="lg:col-span-2">
								<SalesChart />
							</div>
							<div>
								<EventCalendar />
							</div>
						</div>

						<OngoingEvents />

						<UpcomingEvents />
					</div>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
