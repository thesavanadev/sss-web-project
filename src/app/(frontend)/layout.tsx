import { ReactNode } from "react";
import { Comfortaa as FontHeader, Montserrat as FontBody } from "next/font/google";

import { cn } from "@/lib/utils";
import { mergeOpenGraph } from "@/lib/merge-open-graph";

import { LivePreviewListener } from "@/components/live-preview-listener";
import { ThemeProvider } from "@/components/theme-provider";

import { FooterBlock } from "@/payload/blocks/globals/footer/component";
import { HeaderBlock } from "@/payload/blocks/globals/header/component";

import type { Metadata } from "next";

import "@/frontend/global.css";

const fontHeader = FontHeader({ subsets: ["latin"], variable: "--font-header" });
const fontBody = FontBody({ subsets: ["latin"], variable: "--font-body" });
const serverURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

const RootLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>

			<body className={cn("flex h-screen flex-col font-body antialiased", fontHeader.variable, fontBody.variable)}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<LivePreviewListener />

					<header>
						<HeaderBlock />
					</header>

					<main>{children}</main>

					<footer className="mt-auto">
						<FooterBlock />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;

export const metadata: Metadata = {
	metadataBase: new URL(serverURL),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image",
		creator: "@theSavanaDev",
	},
};
