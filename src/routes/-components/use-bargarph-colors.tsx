import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function useBarGraphColors() {
	const { theme } = useTheme();
	const [resolvedTheme, setResolvedTheme] = useState(theme);

	// Handle "system" theme by checking browser preference
	useEffect(() => {
		if (theme === "system") {
			const mq = window.matchMedia("(prefers-color-scheme: dark)");
			setResolvedTheme(mq.matches ? "dark" : "light");

			const listener = (e: MediaQueryListEvent) =>
				setResolvedTheme(e.matches ? "dark" : "light");

			mq.addEventListener("change", listener);
			return () => mq.removeEventListener("change", listener);
		} else {
			setResolvedTheme(theme);
		}
	}, [theme]);

	// Muted, professional palette with good contrast
	const colors =
		resolvedTheme === "dark"
			? {
					input: "#4f5d95", // muted indigo/blue
					output: "#3ba7b8", // muted teal
				}
			: {
					input: "#2f3b66", // deep muted blue
					output: "#1b6b75", // deep muted teal
				};

	return colors;
}
