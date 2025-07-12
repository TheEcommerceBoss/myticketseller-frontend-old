// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocationIcon from "../Icons/LocationIcon";
import { Calendar } from "lucide-react";
import PropTypes from "prop-types";

const placeholder =
	"https://kzmo9y7ki044m4widvt3.lite.vusercontent.net/placeholder.svg?height=200&width=300";

interface FeaturedEventCardProps {
	id?: string | number;
	image?: string;
	title: string;
	date: string;
	description?: string;
	location: string;
	category: string;
}

export default function FeaturedEventCard({
	id,
	image,
	title,
	date,
	description,
	location,
	category,
}: FeaturedEventCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-[0_4px_10px_0] shadow-black/20 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg h-full">
			<Link
				onClick={() =>
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					})
				}
				to={"/event/view/" + id}
				className="flex flex-col h-full"
			>
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

				<div className="flex flex-col flex-1 p-4 pb-6">
					<div className="flex items-center text-base text-[#6E6D6D] mb-3 gap-2">
						<Calendar size={16} className="opacity-70" />
						<span>{date}</span>
					</div>

					<h3 className="mb-3 text-xl line-clamp-2">{title}</h3>

					{description && (
						<p className="mb-8 text-base text-[#6E6D6D] line-clamp-2">
							{description}
						</p>
					)}
					<div className="flex items-center text-base text-[#6E6D6D] gap-2 mt-auto text-ellipsis">
						<LocationIcon />
						<span className="truncate">{location}</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

FeaturedEventCard.propTypes = {
	id: PropTypes.number,
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	description: PropTypes.string,
	location: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
};
