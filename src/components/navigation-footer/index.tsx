import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/container";
import { RenderImage } from "@/components/render-image";
import { ThemeToggle } from "@/components/theme-toggle";

import type { Footer } from "@/payload-types";

type NavigationFooterProps = {
	footer: Footer;
};

export const NavigationFooter = ({ footer }: NavigationFooterProps) => {
	const serverURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;
	const src = footer.logo && typeof footer.logo === "object" ? footer.logo.url : null;
	const alt = footer.logo && typeof footer.logo === "object" ? footer.logo.alt : null;

	return (
		<div className="bg-secondary dark:bg-transparent">
			<Container className="py-8">
				<div className="gap-8 lg:flex">
					<div className="w-full lg:w-2/5">
						<Link href="/" className="flex items-center gap-2 text-primary">
							<div className="relative h-8 w-8">
								<RenderImage src={`${serverURL}${src}`} alt={`${serverURL}${alt}`} />
							</div>

							<p className="font-header text-xl font-bold">{footer.title}</p>
						</Link>

						<p className="mt-2 text-left text-muted-foreground">{footer.description}</p>

						<p className="mt-5 font-header font-semibold text-primary">{footer.slogan}</p>

					</div>

					<div className="mt-6 lg:mt-0 lg:flex-1">
						<div className="grid grid-cols-2 gap-5 md:grid-cols-3">
							{footer.navigationLinks?.map((links) => (
								<div key={links.id} className="text-justify">
									{links.navigationHeaderOptions === "yes" && (
										<h3 className="font-header uppercase text-primary">{links.navigationHeaderText}</h3>
									)}

									<>
										{links.navigationLink?.map((link) => (
											<Link
												key={link.id}
												href={link.navigationLinkURL}
												target={link.navigationLinkNewTab ? "_blank" : "_self"}
												className="nav-link-hover-underline-footer"
											>
												{link.navigationLinkLabel}
											</Link>
										))}
									</>
								</div>
							))}
						</div>
					</div>
				</div>

				<Separator className="my-5 text-muted-foreground" />

				<div className="flex items-center justify-between">
					<p className="text-xs md:text-sm">{footer.copyright}</p>

					<ThemeToggle />
				</div>
			</Container>
		</div>
	);
};
