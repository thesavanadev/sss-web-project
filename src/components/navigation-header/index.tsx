"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/container";
import { RenderImage } from "@/components/render-image";

import type { Header } from "@/payload-types";

type NavigationHeaderProps = {
	header: Header;
};

export const NavigationHeader = ({ header }: NavigationHeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const serverURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;
	const src = header.logo && typeof header.logo === "object" ? header.logo.url : null;
	const alt = header.logo && typeof header.logo === "object" ? header.logo.alt : null;

	return (
		<nav
			className={`fixed z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/95 shadow-md backdrop-blur-sm" : "bg-transparent"}`}
		>
			<Container className="py-5">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2 text-primary">
						<div className="relative h-8 w-8">
							<RenderImage src={`${serverURL}${src}`} alt={`${serverURL}${alt}`} />
						</div>
						<p className="font-header font-bold md:text-lg lg:text-xl">{header.title}</p>
					</Link>

					<div className="hidden items-center space-x-8 lg:flex">
						<>
							{header.navigationLinks?.map((links) => (
								<div key={links.id} className="space-x-8">
									{links.navigationLink?.map((link) => (
										<Link
											key={link.id}
											href={link.navigationLinkURL}
											target={link.navigationLinkNewTab ? "_blank" : "_self"}
											className="nav-link-hover-underline-header"
										>
											{link.navigationLinkLabel}
										</Link>
									))}
								</div>
							))}
						</>

						<Button variant="outline" className="uppercase">
							{header.ctaNavigationLink?.map((link) => {
								return (
									<Link key={link.id} href={link.navigationLinkURL} target={link.navigationLinkNewTab ? "_blank" : "_self"}>
										{link.navigationLinkLabel}
									</Link>
								);
							})}
						</Button>
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="lg:hidden">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>

						<SheetContent side="right" className="w-[300px] sm:w-[400px]">
							<SheetHeader className="mb-5 py-3 text-left font-header font-semibold">
								<SheetTitle className="text-primary">{header.title}</SheetTitle>
								<SheetDescription className="text-xs">{header.slogan}</SheetDescription>
							</SheetHeader>

							<nav className="flex flex-col space-y-8">
								<>
									{header.navigationLinks?.map((links) => (
										<div key={links.id} className="flex flex-col space-y-8 text-left">
											{links.navigationLink?.map((link) => (
												<Link key={link.id} href={link.navigationLinkURL} className="nav-link-hover-underline-header">
													{link.navigationLinkLabel}
												</Link>
											))}
										</div>
									))}
								</>

								<Button variant="outline" className="w-full text-lg uppercase">
									{header.ctaNavigationLink?.map((link) => {
										return (
											<Link key={link.id} href={link.navigationLinkURL}>
												{link.navigationLinkLabel}
											</Link>
										);
									})}
								</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</Container>
		</nav>
	);
};
