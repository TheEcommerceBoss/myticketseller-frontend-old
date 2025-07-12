import { Link } from "react-router-dom";
import NewsLetter from "../(others)/NewsLetter";
import facebook from "../../assets/(landing)/icons/facebook.svg";
import instagram from "../../assets/(landing)/icons/instagram.svg";
import twitter from "../../assets/(landing)/icons/twitter.svg";
import youtube from "../../assets/(landing)/icons/youtube.svg";
import logo from "../../assets/(site_assets)/logo-white.svg";

export default function Footer() {
	return (
		<footer className="relative pt-[201px] bg-secondary text-white md:pt-[250px]">
			<NewsLetter />

			<div className="container mx-auto max-w-7xl">
				<div className="flex flex-col px-5 items-center gap-[56px] pb-[98px] md:items-start md:px-8 lg:flex-row lg:justify-between lg:px-5 lg:items-center xl:px-10">
					<Link to="/" className="block text-center">
						<img
							src={logo}
							alt="myticketseller"
							width={150}
							height={20}
							className="w-full max-w-[150px] mx-auto lg:min-w-[180px] lg:mx-0"
						/>
					</Link>

					<div className="flex flex-col gap-[76px] text-center md:text-left lg:flex-row lg:gap-[40px] xl:gap-[76px]">
						<div className="flex flex-col items-center md:items-start">
							<h3 className="mb-2 text-xl font-medium sm:text-2xl sm:mb-3">
								About Us
							</h3>
							<p className="text-base max-w-[279px] sm:text-lg sm:max-w-[340px]">
								Whether you are looking for the hottest
								nightlife events, exclusive parties, or intimate
								gatherings, My TicketSeller has&nbsp;got you
								covered.
							</p>
						</div>
						<div className="flex flex-col items-center md:items-start">
							<h3 className="mb-2 text-xl font-medium xl:text-2xl sm:text-2xl sm:mb-3">
								Our Services
							</h3>
							<ul className="text-base max-w-[279px] sm:text-lg md:max-w-none">
								<li>
									<Link
										to="/"
										className="transition-all ease-in-out hover:text-primary"
									>
										Ticketing Solutions
									</Link>
								</li>
								<li>
									<Link
										to="/"
										className="transition-all ease-in-out hover:text-primary"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										to="/"
										className="transition-all ease-in-out hover:text-primary"
									>
										Pricing Plans
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex flex-col items-center md:items-start">
							<h3 className="mb-2 text-xl font-medium xl:text-2xl sm:text-2xl sm:mb-3">
								Terms
							</h3>
							<ul className="text-base max-w-[279px] sm:text-lg  md:max-w-none">
								<li>
									<Link
										to="/"
										className="transition-all ease-in-out hover:text-primary"
									>
										Terms and Conditions
									</Link>
								</li>
								<li>
									<Link
										to="/"
										className="transition-all ease-in-out hover:text-primary"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/"
										className="transition-all ease-in-out hover:text-primary"
									>
										Refund Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="h-[1px] w-full bg-white lg:hidden"></div>

				{/* socials and copyright */}
				<div>
					<div className="pt-12 pb-[37px] px-5 mx-auto flex flex-col gap-12 items-center md:flex-row-reverse md:justify-between md:px-8 xl:px-10 lg:pb-[58px]">
						<div className="flex items-center justify-center gap-5">
							<Link
								to={"/"}
								className="p-[9px] rounded-full bg-white/20 block w-fit hover:bg-white/30 transition-all ease-in-out"
							>
								<img
									src={facebook}
									alt="facebook"
									width={25}
									height={25}
								/>
							</Link>
							<Link
								to={"/"}
								className="p-[9px] rounded-full bg-white/20 block w-fit hover:bg-white/30 transition-all ease-in-out"
							>
								<img
									src={twitter}
									alt="twitter"
									width={25}
									height={25}
								/>
							</Link>
							<Link
								to={"/"}
								className="p-[9px] rounded-full bg-white/20 block w-fit hover:bg-white/30 transition-all ease-in-out"
							>
								<img
									src={instagram}
									alt="instagram"
									width={25}
									height={25}
								/>
							</Link>
							<Link
								to={"/"}
								className="p-[9px] rounded-full bg-white/20 block w-fit hover:bg-white/30 transition-all ease-in-out"
							>
								<img
									src={youtube}
									alt="youtube"
									width={25}
									height={25}
								/>
							</Link>
						</div>
						<div className="text-center max-w-[240px] md:max-w-full lg:text-lg xl:text-xl">
							© 2024 My TicketSeller. Powered by{" "}
							<Link to={"/"} className="underline">
								The Ecommerce Boss.
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
