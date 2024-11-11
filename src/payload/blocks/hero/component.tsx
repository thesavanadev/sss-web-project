import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { RenderImage } from "@/components/render-image";

type HeroBlockProps = {
	heroType: string;
	heroSubtitle?: string;
	heroTitle: string;
	heroMessage?: string;
	heroCover: { alt: string; url: string };
	heroCTA?: { heroCTALabel: string; heroCTAUrl: string }[];
};

export const HeroBlock = ({ heroType, heroSubtitle, heroTitle, heroMessage, heroCover, heroCTA }: HeroBlockProps) => {
	const serverURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;
	const src = heroCover && typeof heroCover === "object" ? heroCover.url : null;
	const alt = heroCover && typeof heroCover === "object" ? heroCover.alt : null;

	return (
		<section className="m-1">
			<div className={cn("relative flex items-center", { "h-[50rem]": heroType === "homepage", "h-[30rem]": heroType === "subpage" })}>
				<div className="absolute inset-0 z-0">
					<RenderImage src={`${serverURL}${src}`} alt={`${serverURL}${alt}`} />
					<div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
				</div>

				<Container className="z-10 text-white">
					<div className="max-w-2xl space-y-6 text-pretty">
						<p className="text-sm font-semibold uppercase md:text-base">{heroSubtitle}</p>

						<h1 className="font-header text-4xl font-bold md:text-6xl">{heroTitle}</h1>

						<p className="text-lg md:text-xl">{heroMessage}</p>

						{heroType === "homepage" && (
							<Button size="lg" className="rounded-lg font-semibold uppercase">
								{heroCTA?.map((link, i) => {
									return (
										<Link key={i} href={link.heroCTAUrl}>
											{link.heroCTALabel}
										</Link>
									);
								})}
							</Button>
						)}
					</div>
				</Container>
			</div>
		</section>
	);
};
