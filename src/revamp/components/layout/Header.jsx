import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useAppContext } from "../../../context/AppContext";

const Header = () => {
	const { toggleMenu } = useAppContext();

	return (
		<header className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
			<div className="flex items-center gap-4">
				<button className="lg:hidden" onClick={toggleMenu}>
					<Menu size={20} />
				</button>
				<motion.h1
					className="text-xl font-semibold text-neutral-900"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					Dashboard
				</motion.h1>
			</div>

			<div className="flex items-center gap-4">
				<div className="relative hidden md:block">
					<Search
						size={18}
						className="absolute -translate-y-1/2 left-3 top-1/2 text-neutral-400"
					/>
					<input
						type="text"
						placeholder="Search..."
						className="w-64 py-2 pl-10 pr-4 border rounded-full border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
					/>
				</div>

				<div className="relative">
					<button className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
						<Bell size={18} className="text-neutral-600" />
						<span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-accent-500"></span>
					</button>
				</div>

				<div className="flex items-center gap-3">
					<img
						src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
						alt="Profile"
						className="object-cover w-10 h-10 border-2 border-white rounded-full"
					/>
					<div className="hidden md:block">
						<p className="font-medium text-neutral-900">John Doe</p>
						<p className="text-xs text-neutral-500">Admin</p>
					</div>
					<ChevronDown
						size={16}
						className="hidden md:block text-neutral-400"
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
