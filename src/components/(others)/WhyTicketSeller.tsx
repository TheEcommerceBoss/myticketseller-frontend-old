/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import FeatureCard from "../ui/FeatureCard";
import Button from "../ui/button";
import easy from "../../assets/(landing)/icons/easy.svg";
import placard from "../../assets/(landing)/icons/placard.svg";
import planeTickets from "../../assets/(landing)/icons/plane-tickets.svg";

export default function WhyTicketSeller() {
	return (
		<section className="pt-[108px] text-white bg-secondary-500 pb-[141px] lg:pt-[82px] lg:pb-[98px]">
			<div className="container px-5 mx-auto max-w-7xl">
				<h2 className="relative text-2xl font-semibold mb-[118px] text-center uppercase tracking-wide md:text-3xl md:w-fit md:mx-auto lg:text-[2rem] lg:mb-[130px]">
					Why My TicketSeller?
					<div className="absolute left-0 right-0 -bottom-[25px] flex flex-col gap-[2px] items-center md:items-end ">
						<div className="bg-white h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
						<div className="bg-white h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
					</div>
				</h2>

				<div className="grid grid-cols-1 gap-[74px] mx-auto md:grid-cols-3 md:gap-[30px]">
					<FeatureCard
						icon={easy}
						title="Exclusive Events"
						description="Access tickets to the trendiest parties and events around the city."
					/>
					<FeatureCard
						icon={placard}
						title="Easy Payments"
						description="Secure and hassle-free checkout, so you can focus on the fun."
					/>
					<FeatureCard
						icon={planeTickets}
						title="Instant Ticket Delivery"
						description="Get your tickets sent straight to your inbox, ready for the big night!"
					/>
				</div>

				{/* <div className="flex justify-center mt-12 md:mt-[67px] lg:mt-[121px]">
					<Link to={"/"} className="block">
						<Button className="flex font-semibold rounded-full h-12 e w-[223px] gap-[10px] text-lg lg:h-14 bg-primary">
							View Our Services
						</Button>
					</Link>
				</div> */}
			</div>
		</section>
	);
}
