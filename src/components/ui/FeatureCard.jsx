import PropTypes from "prop-types";

export default function FeatureCard({ icon, title, description }) {
	return (
		<div className="flex flex-col items-center text-center ">
			<div className="mb-4">
				<img
					src={icon}
					alt="icon"
					width={100}
					height={100}
					loading="lazy"
				/>
			</div>
			<h3 className="mb-2 text-xl font-bold xl:text-2xl">{title}</h3>
			<p className="text-base max-w-[279px] lg:text-lg xl:max-w-[300px]">
				{description}
			</p>
		</div>
	);
}

FeatureCard.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};
