import { motion } from "motion/react";
import { useState } from "react";

const UpcomingEvents = () => {
	const [activeSlide, setActiveSlide] = useState(0);

	const events = [
		{
			id: 1,
			title: "Nicki Minaj Live at Los Angeles",
			date: "Mon, Oct 31, 6:30 PM",
			time: "6:30 PM",
			location: "Los Angeles, USA",
			attendees: 0,
			imageUrl:
				"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
		},
		{
			id: 2,
			title: "Nicki Minaj Live at Los Angeles",
			date: "Mon, Oct 31, 6:30 PM",
			time: "6:30 PM",
			location: "Los Angeles, USA",
			attendees: 0,
			imageUrl:
				"https://images.pexels.com/photos/3975635/pexels-photo-3975635.jpeg",
		},
		{
			id: 3,
			title: "Nicki Minaj Live at Los Angeles",
			date: "Mon, Oct 31, 6:30 PM",
			time: "6:30 PM",
			location: "Los Angeles, USA",
			attendees: 0,
			imageUrl:
				"https://images.pexels.com/photos/3975635/pexels-photo-3975635.jpeg",
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
			<h2 className="mb-6 text-lg font-semibold">Upcoming Events</h2>

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
							<p className="text-sm text-neutral-500">
								{event.location}
							</p>
						</div>
					</motion.div>
				))}
			</motion.div>

			<div className="flex justify-center gap-1 mt-6">
				{[0, 1, 2].map((dot) => (
					<button
						key={dot}
						className={`w-2 h-2 rounded-full ${
							activeSlide === dot
								? "bg-primary-500"
								: "bg-neutral-300"
						}`}
						onClick={() => setActiveSlide(dot)}
					/>
				))}
			</div>
		</div>
	);
};

export default UpcomingEvents;
