import PropTypes from "prop-types";
import clsx from "clsx";

const Input = ({
	type = "text",
	placeholder = "",
	className,
	value,
	onChange,
	disabled = false,
	...props
}) => {
	const baseStyles =
		"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-none outline-none ";

	const disabledStyles = "opacity-50 cursor-not-allowed";

	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			disabled={disabled}
			className={clsx(
				baseStyles,
				"border-gray-300",
				disabled && disabledStyles,
				className
			)}
			{...props}
		/>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
};

export default Input;
