import { featuredEvents } from "../../lib/data";
import SearchIcon from "../../components/Icons/SearchIcon";
import Button from "../ui/button";
import EventTabs from "./EventTabs";
import FeaturedEventCard from "..//../components/ui/FeaturedEventCard";
import { Link } from "react-router-dom";
// import FeaturedEventCard from "../ui/FeaturedEventCard";

export default function FeaturedEvents() {
	return (
		<section className="pb-[88px] container mx-auto px-5 pt-[280px] md:pt-[160px] lg:pt-[204px] md:pb-[94px] lg:pb-[100px]">
			<div className="container mx-auto max-w-[524px] md:max-w-none lg:max-w-7xl">
				<h2 className="relative text-2xl font-semibold mb-10 text-center uppercase tracking-wide text-secondary leading-normal md:text-3xl md:w-fit md:mx-auto md:mb-12 lg:text-[2rem] xl:mb-14">
					Featured Events <br className="md:hidden" /> Around You
					<div className="absolute left-0 right-0 -bottom-[20px] flex flex-col gap-[2px] items-center md:items-end ">
						<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
						<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
					</div>
				</h2>
				<p className="text-center mb-[44px] text-lg max-w-[454px] mx-auto md:max-w-none md:mb-[54px] lg:text-xl xl:text-2xl xl:mb-[64px]">
					Check out what&apos;s trending now and grab your tickets
					before they sell out!
				</p>
				<EventTabs />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-[52px] xl:gap-x-[67px] xl:gap-y-[77px]">
					{featuredEvents.map((event, index) => (
						<FeaturedEventCard
							key={index}
							image={event.image}
							title={event.title}
							date={event.date}
							location={event.location}
							category={event.category}
						/>
					))}
				</div>
				<div className="flex justify-center mt-10 md:mt-[67px] lg:mt-[93px]">
					<Link to={"/discover"} className="block">
						<Button className="flex font-semibold rounded-full h-12 e w-[248px] gap-[10px] text-lg  lg:h-14">
							<SearchIcon className="size-[22px]" />
							Find More Events
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
