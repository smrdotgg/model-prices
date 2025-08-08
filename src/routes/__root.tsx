import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<>
				{/* <Header /> */}
				<Outlet />
				<TanStackRouterDevtools />
			</>
		</ThemeProvider>
	),
});
