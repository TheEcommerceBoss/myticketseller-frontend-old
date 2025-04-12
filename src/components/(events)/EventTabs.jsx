"use client";

import { useState } from "react";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "./select-original";
import { tabs } from "../../lib/data";

export default function EventTabs() {
	const [activeTab, setActiveTab] = useState("all");

	return (
		<div className="pb-2 overflow-x-auto scrollbar-hide">
			{/* dropdown for mobile screens */}
			{/* <div className="block px-4 md:hidden">
				<Select
					onValueChange={(value) => setActiveTab(value)}
					value={activeTab}
				>
					<SelectTrigger className="w-full !text-[#6E6D6D] text-lg shadow-none p-0 px-2 justify-center gap-5 border-[#6E6D6D] !h-[41px]">
						<SelectValue placeholder="All" />
					</SelectTrigger>
					<SelectContent>
						{tabs.map((tab) => (
							<SelectItem key={tab.id} value={tab.id}>
								{tab.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div> */}

			{/* tabs for tablet and desktop screens */}
			<div className="hidden space-x-2 min-w-max md:flex lg:justify-between xl:max-w-[1225px] xl:mx-auto px-4">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex items-center px-4 py-2 rounded-[3px] text-sm font-medium transition-colors md:text-base xl:text-lg ${
							activeTab === tab.id
								? "bg-indigo-900 text-white"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
		</div>
	);
}
