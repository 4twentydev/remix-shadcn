import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useNavigate,
	useRouteError,
} from "@remix-run/react";
import * as React from "react";
import { RouterProvider } from "react-aria-components";

import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import {
	ThemeSwitcherSafeHTML,
	ThemeSwitcherScript,
} from "@/components/theme-switcher";

import "./globals.css";

function NavProvider({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	return <RouterProvider navigate={navigate}>{children}</RouterProvider>;
}

function App({ children }: { children: React.ReactNode }) {
	return (
		<NavProvider>
			<ThemeSwitcherSafeHTML lang="en" className="touch-manipulation">
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, user-scalable=no"
					/>
					<Meta />
					<Links />
					<ThemeSwitcherScript />
				</head>
				<body>
					<GlobalPendingIndicator />
					{children}
					<ScrollRestoration />
					<Scripts />
				</body>
			</ThemeSwitcherSafeHTML>
		</NavProvider>
	);
}

export default function Root() {
	return (
		<App>
			<Outlet />
		</App>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	let status = 500;
	let message = "An unexpected error occurred.";
	if (isRouteErrorResponse(error)) {
		status = error.status;
		switch (error.status) {
			case 404:
				message = "Page Not Found";
				break;
		}
	} else {
		console.error(error);
	}

	return (
		<App>
			<div className="container prose py-8">
				<h1>{status}</h1>
				<p>{message}</p>
			</div>
		</App>
	);
}
