/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const EventCalendar = () => {
	const [currentMonth, setCurrentMonth] = useState("October 2024");

	// Days of the week
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	// Days with events (marked with orange dots)
	const daysWithEvents = [13, 20, 23];

	// Current day
	const today = 25;

	// Calendar grid
	const calendarDays = [
		[29, 30, 1, 2, 3, 4, 5],
		[6, 7, 8, 9, 10, 11, 12],
		[13, 14, 15, 16, 17, 18, 19],
		[20, 21, 22, 23, 24, 25, 26],
		[27, 28, 29, 30, 31, 1, 2],
	];

	return (
		<motion.div
			className="h-full p-6 bg-white rounded-xl shadow-card"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center justify-between mb-4">
				<button className="p-1 rounded-full hover:bg-neutral-100">
					<ChevronLeft size={20} className="text-neutral-600" />
				</button>
				<h2 className="font-semibold text-md">{currentMonth}</h2>
				<button className="p-1 rounded-full hover:bg-neutral-100">
					<ChevronRight size={20} className="text-neutral-600" />
				</button>
			</div>

			<div className="grid grid-cols-7 mb-2">
				{daysOfWeek.map((day, index) => (
					<div
						key={index}
						className="text-xs font-medium text-center text-neutral-500"
					>
						{day}
					</div>
				))}
			</div>

			<div className="space-y-2">
				{calendarDays.map((week, weekIndex) => (
					<div key={weekIndex} className="grid grid-cols-7 gap-1">
						{week.map((day, dayIndex) => {
							const isToday = day === today && weekIndex === 3; // 4th week contains the 25th
							const hasEvent = daysWithEvents.includes(day);
							const isCurrentMonth =
								!(weekIndex === 0 && day > 7) &&
								!(weekIndex === 4 && day < 7);

							return (
								<div
									key={dayIndex}
									className="flex justify-center"
								>
									<div
										className={`
                      flex items-center justify-center w-10 h-10 text-sm rounded-full cursor-pointer
                      ${isToday ? "today" : ""} 
                      ${hasEvent ? "event" : ""}
                      ${!isCurrentMonth ? "text-neutral-300" : ""}
                    `}
									>
										{day}
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default EventCalendar;
