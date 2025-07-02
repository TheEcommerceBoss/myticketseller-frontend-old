import { motion } from "motion/react";
import { Flame, Ticket, Users } from "lucide-react";

const StatCards = () => {
	const stats = [
		{
			title: "Tickets Sold",
			value: "149k",
			icon: <Ticket size={24} />,
			iconBg: "bg-primary-100",
			iconColor: "text-primary-600",
		},
		{
			title: "Event Attendance Rate",
			value: "90.5%",
			icon: <Users size={24} />,
			iconBg: "bg-secondary-100",
			iconColor: "text-secondary-600",
		},
		{
			title: "Top-Selling Events",
			value: 10,
			icon: <Flame size={24} />,
			iconBg: "bg-accent-100",
			iconColor: "text-accent-500",
		},
	];

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{stats.map((stat, index) => (
				<motion.div
					key={index}
					className="flex items-center justify-between p-6 bg-white rounded-xl shadow-card"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.1 }}
				>
					<div>
						<p className="text-sm text-neutral-500">{stat.title}</p>
						<p className="mt-1 text-2xl font-bold">{stat.value}</p>
					</div>
					<div
						className={`flex items-center justify-center w-12 h-12 rounded-full ${stat.iconBg}`}
					>
						<span className={stat.iconColor}>{stat.icon}</span>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default StatCards;
