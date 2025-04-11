import MasksIcon from "../../components/Icons/MasksIcon";
import CalendarIcon from "../../components/Icons/CalendarIcon";
import { howItWorksSteps } from "../../lib/data";
import bell from "../../assets/(landing)/icons/bell.svg";
import searchSuggestionSm from "../../assets/(landing)/search-suggestion_sm.svg";
import searchSuggestionLg from "../../assets/(landing)/search-suggestion_lg.svg";
import eventCalendarSm from "../../assets/(landing)/event-calendar_sm.svg";
import eventCalendarLg from "../../assets/(landing)/event-calendar_lg.svg";

export default function HowItWorks() {
	return (
		<section className="pt-[105px] container mx-auto px-5 pb-[513px] md:pb-[340px] lg:pb-[386px] md:pt-[108px] lg:pt-[133px]">
			<div className="container mx-auto max-w-7xl space-y-[88px] md:space-y-[100px]">
				{/* how it works section */}
				<div className="flex flex-col gap-y-[70px] lg:grid lg:grid-cols-12 lg:items-center">
					<div className="lg:col-span-7">
						<h2 className="relative text-2xl font-semibold mb-[60px] text-center uppercase tracking-wide text-secondary leading-normal md:text-3xl md:w-fit md:mx-auto md:mb-12 lg:mb-[65px] lg:text-[2rem] xl:mb-[75px] lg:mx-0">
							How it works
							<div className="absolute left-0 right-0 -bottom-[20px] flex flex-col gap-[2px] items-center md:items-end ">
								<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
								<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
							</div>
						</h2>
						<div className="mx-auto space-y-6 w-fit lg:mx-0">
							{howItWorksSteps.map((step) => (
								<div
									key={step.id}
									className="flex items-start text-[#525151] "
								>
									<div className="flex items-center text-base min-[430px]:text-lg xl:text-2xl">
										<div className="mr-3 lg:mr-6">
											<MasksIcon className="xl:size-10" />
										</div>
										<div>
											<span>{step.title}</span>{" "}
											{step.description}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="select-none lg:col-span-5">
						<img
							src={searchSuggestionSm}
							alt="search suggestion illustration"
							width={200}
							height={200}
							className="w-full max-w-[350px] mx-auto md:max-w-[400px] md:hidden"
							loading="lazy"
						/>
						<img
							src={searchSuggestionLg}
							alt="search suggestion illustration"
							width={200}
							height={200}
							className="w-full max-w-[350px] mx-auto md:max-w-[400px] hidden md:block lg:max-w-none lg:mx-auto"
							loading="lazy"
						/>
					</div>
				</div>

				{/* event calendar section */}
				<div className="flex flex-col gap-y-[33px] lg:grid lg:grid-cols-12 lg:items-center">
					<div className="lg:col-span-7 lg:order-2 lg:max-w-[509px] lg:justify-self-end">
						<h2 className="relative text-2xl font-semibold mb-[60px] text-center uppercase tracking-wide text-secondary leading-normal md:text-3xl max-w-[380px] mx-auto md:w-fit md:mx-auto md:mb-[60px] lg:mb-[70px] lg:text-[2rem] xl:mb-[75px] lg:mx-0 md:max-w-[500px] md:text-left">
							Follow Up With Our Special Ticketseller Calendar
							<div className="absolute left-0 right-0 -bottom-[20px] flex flex-col gap-[2px] items-center md:items-start ">
								<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
								<div className="bg-primary h-[4px] w-full max-w-[86px] md:max-w-[122px]"></div>
							</div>
						</h2>
						<div className="space-y-5 w-full max-w-[448px] lg:mx-0 mx-auto lg:max-w-none">
							<div className="bg-white rounded-[20px] shadow-[0_4px_10px_0] shadow-black/20 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg flex items-center gap-4 text-base min-[430px]:text-lg p-4 text-[#6E6D6D] md:p-5 lg:p-6 lg:px-10 lg:gap-6 lg:rounded-[30px]">
								<CalendarIcon className="min-w-[32px] min-h-[32px]" />
								<p>
									<span className="text-secondary">
										Follow the event
									</span>{" "}
									by selecting the appropriate date using the
									calendar feature.
								</p>
							</div>
							<div className="bg-white rounded-[20px] shadow-[0_4px_10px_0] shadow-black/20 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg flex items-center gap-4 text-base min-[430px]:text-lg p-4 text-[#6E6D6D] md:p-5 lg:p-6 lg:px-10 lg:gap-6 lg:rounded-[30px]">
								<img
									src={bell}
									alt="notification bell"
									width={32}
									height={32}
								/>
								<p>
									<span className="text-secondary">
										We will remind
									</span>{" "}
									you when the event will be held 7 days
									before the day.
								</p>
							</div>
						</div>
					</div>
					<div className="select-none lg:col-span-5 lg:order-1">
						<img
							src={eventCalendarSm}
							alt="search suggestion illustration"
							width={200}
							height={200}
							className="w-full max-w-[350px] mx-auto md:max-w-[400px] md:hidden"
							loading="lazy"
						/>
						<img
							src={eventCalendarLg}
							alt="search suggestion illustration"
							width={200}
							height={200}
							className="w-full max-w-[350px] mx-auto md:max-w-[400px] hidden md:block lg:max-w-none lg:mx-auto"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
