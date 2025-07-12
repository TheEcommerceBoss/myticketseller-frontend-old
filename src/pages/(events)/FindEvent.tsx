import HeaderMain from "../../components/(headers)/HeaderMain";
import FeaturedEvents2 from "../../components/(events)/FeaturedEvents2";
// import WhyUs from "../../components/(others)/WhyUs";
// import EventCalendar from "../../components/(others)/HowItWorks";
import Footer from "../../components/(footers)/Footer";
import { useTheme } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";

function LandingPage() {
	const { theme } = useTheme();
	// const navigate = useNavigate();
	const { id } = useParams();

	return (
		<div
			className={`min-h-screen ${
				theme === "dark"
					? "bg-gray-900 text-white"
					: "bg-white text-gray-900"
			}`}
		>
			<HeaderMain variation={4} />

			<main>
				<HeroSection />
				<FeaturedEvents2 sortcategory={id} variation={2} />
			</main>

			<Footer />
		</div>
	);
}

function HeroSection() {
	return (
		<section className="relative w-full bg-[#040171] py-16 md:py-24 lg:py-32">
			<div className="container px-4 mx-auto sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					<div className="mb-6">
						<span className="inline-block px-4 py-1 text-sm font-semibold text-blue-900 bg-white rounded-full md:text-base">
							Events We Sponsor
						</span>
					</div>
					<h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
						Upcoming Events
					</h1>
					<p className="text-lg text-gray-200 md:text-xl">
						Upcoming events schedule must not be missed.
					</p>
				</div>
			</div>
		</section>
	);
}

export default LandingPage;
