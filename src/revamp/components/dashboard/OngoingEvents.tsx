import { motion } from "motion/react";

const OngoingEvents = () => {
	const events = [
		{
			id: 1,
			title: "Nicki Minaj Live at Los Angeles",
			date: "Mon, Oct 31, 6:30 PM",
			time: "6:30 PM",
			location: "Los Angeles",
			attendees: 152,
			imageUrl:
				"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
		},
		{
			id: 2,
			title: "Nicki Minaj Live at Los Angeles",
			date: "Mon, Oct 31, 6:30 PM",
			time: "6:30 PM",
			location: "Los Angeles",
			attendees: 152,
			imageUrl:
				"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
		},
	];

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 },
	};

	return (
		<div className="p-6 bg-white rounded-xl shadow-card">
			<h2 className="mb-6 text-lg font-semibold">Ongoing Events</h2>

			<motion.div
				className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{events.map((event) => (
					<motion.div
						key={event.id}
						className="overflow-hidden bg-white rounded-xl shadow-card"
						variants={item}
					>
						<img
							src={event.imageUrl}
							alt={event.title}
							className="object-cover w-full h-40"
						/>
						<div className="p-4">
							<p className="mb-2 text-sm text-neutral-500">
								{event.date}
							</p>
							<h3 className="mb-2 font-medium text-neutral-800">
								{event.title}
							</h3>
							<div className="flex items-center gap-2">
								<span className="flex items-center gap-1 px-2 py-1 text-xs rounded-full text-primary-600 bg-primary-50">
									<span>{event.attendees}</span>
									<span className="font-medium">Members</span>
								</span>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default OngoingEvents;
