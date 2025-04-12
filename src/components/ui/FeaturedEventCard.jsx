// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocationIcon from "../Icons/LocationIcon";
import { Calendar } from "lucide-react";
import PropTypes from "prop-types";

const placeholder =
	"https://kzmo9y7ki044m4widvt3.lite.vusercontent.net/placeholder.svg?height=200&width=300";

export default function FeaturedEventCard({
	image,
	title,
	date,
	description,
	location,
	category,
}) {
	return (
		<div className="bg-white rounded-lg shadow-[0_4px_10px_0] shadow-black/20 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
			<Link to={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}>
				<div className="relative h-48">
					<img
						src={image || placeholder}
						alt={title}
						className="object-cover w-full h-full"
					/>
					<div className="absolute hidden px-2 py-1 text-xs text-white bg-indigo-900 rounded top-2 left-2">
						{category}
					</div>
				</div>

				<div className="p-4 pb-6">
					<div className="flex items-center text-base text-[#6E6D6D] mb-3 gap-2">
						<Calendar size={16} className="opacity-70" />
						<span>{date}</span>
					</div>

					<h3 className="mb-3 text-xl line-clamp-2">{title}</h3>

					{description && (
						<p className="mb-2 text-base text-[#6E6D6D] line-clamp-3">
							{description}
						</p>
					)}
					<div className="flex items-center text-base text-[#6E6D6D] gap-2">
						<LocationIcon />
						<span>{location}</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

FeaturedEventCard.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	description: PropTypes.string,
	location: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
};
