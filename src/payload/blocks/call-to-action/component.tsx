import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { RenderHTML } from "@/components/render-html";
import { RenderImage } from "@/components/render-image";

type CallToActionBlockProps = {
	ctaContent_html: string;
	ctaLink: { navigationLinkLabel: string; navigationLinkURL: string; navigationLinkNewTab?: boolean }[];
	ctaCover: { url: string; alt: string };
};

export const CallToActionBlock = ({ ctaContent_html, ctaLink, ctaCover }: CallToActionBlockProps) => {
	const serverURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;
	const src = ctaCover && typeof ctaCover === "object" ? ctaCover.url : null;
	const alt = ctaCover && typeof ctaCover === "object" ? ctaCover.alt : null;

	return (
		<Container className="my-16">
			<div className="rounded-lg lg:flex lg:justify-center">
				<div className="overflow-hidden rounded-lg border bg-secondary lg:flex lg:w-full">
					<div className="lg:w-1/2">
						<div className="relative flex h-64 justify-center bg-cover lg:h-full">
							<RenderImage src={`${serverURL}${src}`} alt={`${serverURL}${alt}`} />
						</div>
					</div>

					<div className="max-w-xl space-y-5 px-5 py-12 lg:w-1/2">
						<div className="flex items-center justify-center">{ctaContent_html && <RenderHTML content={ctaContent_html} />}</div>

						<div className="mt-6">
							{ctaLink && (
								<Button size="lg" className="inline-flex w-full rounded-lg font-semibold uppercase sm:w-auto">
									{ctaLink?.map((link, i) => {
										return (
											<Link key={i} href={link.navigationLinkURL} target={link.navigationLinkNewTab ? "_blank" : "_self"}>
												{link.navigationLinkLabel}
											</Link>
										);
									})}
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};
