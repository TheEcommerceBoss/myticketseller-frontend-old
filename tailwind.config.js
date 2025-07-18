export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0f7ff",
					100: "#e0eefe",
					200: "#c0ddfd",
					300: "#91c3fb",
					400: "#61a0f8",
					500: "#3b82f6", // primary
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
				},
				secondary: {
					50: "#ecfdf5",
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
				},
				accent: {
					50: "#fff7ed",
					100: "#ffedd5",
					200: "#fed7aa",
					300: "#fdba74",
					400: "#fb923c",
					500: "#f97316", // accent
					600: "#ea580c",
					700: "#c2410c",
					800: "#9a3412",
					900: "#7c2d12",
				},
				neutral: {
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
				},
				background: "oklch(1 0 0)",
				foreground: "oklch(0.141 0.005 285.823)",
				card: "oklch(1 0 0)",
				"card-foreground": "oklch(0.141 0.005 285.823)",
				popover: "oklch(1 0 0)",
				"popover-foreground": "oklch(0.141 0.005 285.823)",
				// primary: "oklch(69.58% 0.204259 43.491)",
				"primary-foreground": "oklch(0.985 0 0)",
				// secondary: "oklch(25.09% 0.1697 265.64)",
				"secondary-foreground": "oklch(0.21 0.006 285.885)",
				muted: "oklch(0.967 0.001 286.375)",
				"muted-foreground": "oklch(0.552 0.016 285.938)",
				// accent: "oklch(0.967 0.001 286.375)",
				"accent-foreground": "oklch(0.21 0.006 285.885)",
				destructive: "oklch(0.577 0.245 27.325)",
				border: "oklch(0.92 0.004 286.32)",
				input: "oklch(0.92 0.004 286.32)",
				ring: "oklch(0.705 0.015 286.067)",
				"chart-1": "oklch(0.646 0.222 41.116)",
				"chart-2": "oklch(0.6 0.118 184.704)",
				"chart-3": "oklch(0.398 0.07 227.392)",
				"chart-4": "oklch(0.828 0.189 84.429)",
				"chart-5": "oklch(0.769 0.188 70.08)",
				sidebar: "oklch(0.985 0 0)",
				"sidebar-foreground": "oklch(0.141 0.005 285.823)",
				"sidebar-primary": "oklch(0.21 0.006 285.885)",
				"sidebar-primary-foreground": "oklch(0.985 0 0)",
				"sidebar-accent": "oklch(0.967 0.001 286.375)",
				"sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
				"sidebar-border": "oklch(0.92 0.004 286.32)",
				"sidebar-ring": "oklch(0.705 0.015 286.067)",
			},
			keyframes: {
				move: {
					"0%, 100%": { transform: "translateX(0)" },
					"50%": { transform: "translateX(11rem)" },
				},
			},
			animation: {
				"spin-move": "move 5s ease-in-out infinite",
				"spin-slow": "spin 5s linear infinite",
			},
		},
	},
	plugins: [],
};
