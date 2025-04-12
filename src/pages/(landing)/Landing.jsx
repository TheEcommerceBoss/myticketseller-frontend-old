import Banner from "../../assets/(landing)/banner.png";
import Banner2 from "../../assets/(landing)/banner2.png";
import Clown from "../../assets/(landing)/clown.png";
import FeaturedEvents2 from "../../components/(events)/FeaturedEvents2";
import FeaturedEvents from "../../components/(events)/FeaturedEvents";
import Footer from "../../components/(footers)/Footer";
// import Footer from "../../components/(footers)/Footer2";
import HeaderMain from "../../components/(headers)/HeaderMain";
import HowItWorks from "../../components/(others)/HowItWorks";
import WhyTicketSeller from "../../components/(others)/WhyTicketSeller";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as necessary

function LandingPage() {
	const { theme } = useTheme();

	return (
		<>
			<div
				className="relative w-full h-[calc(90vh)] lg:h-[calc(100vh - 10rem)] bg-cover bg-center"
				style={{
					backgroundImage: 'url("' + Banner + '")',
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<HeaderMain variation={1} />

				<div
					className={`absolute inset-0 bg-[#040171B0] opacity-${
						theme == "light" ? 60 : 40
					} `}
				></div>
				<div className="absolute inset-0 flex justify-center lg:items-center">
					<div className="text-center max-w-5xl mx-auto mt-[12rem] md:mt-[20rem]  lg:mt-0 px-6 mb-12 z-10">
						<h1 className="flex items-center text-4xl text-white md:text-6xl lg:text-7xl font-gochi lg:mb-6">
							<div className="flex-wrap items-center justify-center hidden gap-1 my-2 lg:flex">
								<span className="hidden lg:flex text-white mx-[.5rem]">
									YOUR
								</span>
								<div className="mt-1 ">
									<div className="relative inline-flex items-center px-2 py-2 bg-orange-500 rounded-full">
										<div className="absolute flex rounded-full mx-2 items-center justify-center flex-col w-[3rem] h-[3rem] bg-orange-500 animate-spin-move">
											<img
												src={Clown}
												className="text-white w-[2rem] h-[2rem]  animate-spin-slow "
											/>
										</div>
										<div className="w-[15rem] h-[4rem] bg-cover bg-center rounded-full overflow-hidden">
											<img
												src={Banner2}
												alt="Event crowd"
												className="object-cover w-full h-full"
											/>
										</div>
									</div>
								</div>
								<span className="text-white mx-[.5rem]">
									ULTIMATE{" "}
								</span>
								<span className="text-white mx-[.5rem]">
									EVENTS{" "}
								</span>
								<span className="text-white mx-[.5rem]">
									TICKET{" "}
								</span>
								<span className="text-white mx-[.5rem]">
									DESTINATION!{" "}
								</span>
							</div>
							<div className="flex flex-wrap items-center justify-center gap-1 my-2 lg:hidden">
								<div className="mb-5 ">
									<div className="relative inline-flex items-center px-2 py-2 bg-orange-500 rounded-full">
										<div className="absolute flex rounded-full mx-2 items-center justify-center flex-col w-[3rem] h-[3rem] bg-orange-500 animate-spin-move">
											<img
												src={Clown}
												className="text-white w-[2rem] h-[2rem]  animate-spin-slow "
											/>
										</div>
										<div className="w-[15rem] h-[4rem] bg-cover bg-center rounded-full overflow-hidden">
											<img
												src={Banner2}
												alt="Event crowd"
												className="object-cover w-full h-full"
											/>
										</div>
									</div>
								</div>
								<span>
									<span className="text-white mx-[.5rem]">
										YOUR
									</span>
									<span className="text-white mx-[.5rem]">
										ULTIMATE{" "}
									</span>
									<span className="text-white mx-[.5rem]">
										EVENTS{" "}
									</span>
									<span className="text-white mx-[.5rem]">
										TICKET{" "}
									</span>
									<span className="text-white mx-[.5rem]">
										DESTINATION!{" "}
									</span>
								</span>
							</div>
						</h1>

						<p className="text-lg text-gray-200 max-w-3xl mt-1 lg:mt-5 lg:pt-[3rem] mx-auto ">
							Whether you are looking for the hottest nightlife
							events, exclusive parties, or intimate gatherings,
							My TicketSeller has got you covered.
						</p>
					</div>
				</div>
			</div>
			<FeaturedEvents2 />
			<FeaturedEvents />
			<WhyTicketSeller />
			<HowItWorks />
			<Footer />
		</>
	);
}

export default LandingPage;
