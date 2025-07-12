import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({
	children,
	className,
	variant = "primary",
	size = "md",
	onClick,
	disabled = false,
	...props
}) => {
	const baseStyles =
		"flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none";

	const variants = {
		primary: "bg-primary text-white hover:bg-orange-600",
		secondary: "bg-secondary text-white hover:bg-secondary-foreground",
		destructive: "bg-destructive text-white hover:opacity-90",
	};

	const sizes = {
		sm: "h-8 px-4 text-sm",
		md: "h-12 px-6 text-base",
		lg: "h-14 px-8 text-lg",
	};

	return (
		<button
			className={clsx(
				baseStyles,
				variants[variant],
				sizes[size],
				className,
				{ "opacity-50 cursor-not-allowed": disabled }
			)}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	variant: PropTypes.oneOf(["primary", "secondary", "destructive"]),
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

export default Button;
