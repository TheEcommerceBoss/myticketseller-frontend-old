import { cn } from "@/lib/utils";
import { IconProps } from "@/types";
import React from "react";

export default function DropdownIcon({ className, fillColor }: IconProps) {
	return (
		<svg
			width="11"
			height="6"
			viewBox="0 0 11 6"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(className)}
		>
			<path
				d="M0.29248 0.416672L5.50081 5.62501L10.7091 0.416672H0.29248Z"
				fill="#040171"
				className={fillColor}
			/>
		</svg>
	);
}
