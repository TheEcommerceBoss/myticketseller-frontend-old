import { CirclePlus, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/(events)/DashboardHeader";

import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import SideBar from "../../components/(headers)/EventDashboardSidebar";
import { Button } from "@mui/material";

const EventQRCode = () => {
	const { theme, toggleTheme } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		window.innerWidth >= 1024
	);

	useEffect(() => {
		const handleResize = () => {
			setIsSidebarOpen(window.innerWidth >= 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			className={`flex flex-col md:flex-row min-h-screen ${
				theme === "dark" ? "bg-[#222]" : "bg-gray-100"
			}`}
		>
			<SideBar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
			/>

			<div className="flex-1 w-full px-4 py-4 md:py-8 md:px-5 lg:px-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							aria-label={
								isSidebarOpen ? "Close sidebar" : "Open sidebar"
							}
							className={`rounded-lg p-3 ${
								theme === "dark"
									? "bg-[#121212] hover:bg-[#111]"
									: "bg-gray-200 hover:bg-gray-100"
							}`}
						>
							{isSidebarOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</button>

						<h1 className="hidden text-2xl font-bold lg:flex">
							Event QR Code
						</h1>
					</div>

					<div className="flex items-center space-x-4">
						<Link
							to={"/dashboard/event/create"}
							className={`rounded-full outline-none  p-3 ${
								theme === "light"
									? "bg-gray-200  hover:bg-gray-100"
									: "hover:bg-[#111] bg-[#121212]"
							}`}
							aria-label="Toggle theme"
						>
							<CirclePlus
								color={theme === "light" ? "#040171" : "white"}
								size={20}
							/>
						</Link>
						<button
							onClick={toggleTheme}
							className={`rounded-full outline-none p-3 ${
								theme === "light"
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

				<div className="container mx-auto bg-white rounded-xl lg:px-0">
					<div className="p-4">
						<h2 className="text-xl font-medium">Event Name</h2>
					</div>
					<div className="px-4 pt-5 border-gray-300 pb-14 border-y-2">
						<Link
							to={""}
							className="bg-[#F1F1F1] w-full lg:max-w-[80%] mx-auto p-4 text-gray-700 hover:underline block rounded-lg"
						>
							https://www.myticketseller.com/event/view/eoy-party
						</Link>

						<div className="flex items-center justify-center mt-10">
							{/* qr code image */}
							<svg
								width="201"
								height="200"
								viewBox="0 0 201 200"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.35791 8.33398H91.6912V91.6673H8.35791V8.33398ZM25.0246 25.0007V75.0007H75.0246V25.0007H25.0246Z"
									fill="#444444"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M41.6909 41.666H58.3576V58.3327H41.6909V41.666Z"
									fill="#444444"
								/>
								<path
									d="M108.358 8.33398H191.691V91.6673H108.358V8.33398ZM125.025 25.0007V75.0007H175.025V25.0007H125.025Z"
									fill="#444444"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M141.691 41.666H158.358V58.3327H141.691V41.666Z"
									fill="#444444"
								/>
								<path
									d="M8.35791 108.334H91.6912V191.667H8.35791V108.334ZM25.0246 125.001V175.001H75.0246V125.001H25.0246Z"
									fill="#444444"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M41.6909 141.666H58.3576V158.333H41.6909V141.666Z"
									fill="#444444"
								/>
								<path
									d="M191.691 158.334H158.358V191.667H108.358V108.334V158.334H125.025V175.001H141.691V125.001H125.025V108.334H116.691H141.691V125.001H158.358V141.667H175.025V108.334H191.691V158.334ZM191.691 175.001V191.667H175.025V175.001H191.691Z"
									fill="#444444"
								/>
							</svg>
						</div>
					</div>
					<div className="flex flex-col max-w-2xl gap-4 px-4 pt-5 pb-8 mx-auto lg:flex-row lg:justify-center lg:max-w-none lg:mx-0">
						<Button
							variant="contained"
							sx={{
								bgcolor: "#000080",
								textTransform: "none",
								"&:hover": {
									bgcolor: "#000066",
								},
							}}
						>
							Copy URL
						</Button>
						<Button
							variant="contained"
							sx={{
								bgcolor: "#000080",
								textTransform: "none",
								"&:hover": {
									bgcolor: "#000066",
								},
							}}
						>
							Download PDF
						</Button>
						<Button
							variant="contained"
							sx={{
								bgcolor: "#000080",
								textTransform: "none",
								"&:hover": {
									bgcolor: "#000066",
								},
							}}
						>
							Download QR
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventQRCode;
