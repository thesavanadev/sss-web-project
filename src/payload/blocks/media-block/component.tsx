import { cn } from "@/lib/utils";

import { Media } from "@/components/media";
import { RichText } from "@/components/rich-text";

import type { StaticImageData } from "next/image";
import type { Page } from "@/payload-types";

type Props = Extract<Page["layout"][0], { blockType: "mediaBlock" }> & {
	breakout?: boolean;
	captionClassName?: string;
	className?: string;
	enableGutter?: boolean;
	id?: string;
	imgClassName?: string;
	staticImage?: StaticImageData;
	disableInnerContainer?: boolean;
};

export const MediaBlock = (props: Props) => {
	const {
		captionClassName,
		className,
		enableGutter = true,
		imgClassName,
		media,
		position = "default",
		staticImage,
		disableInnerContainer,
	} = props;

	let caption;

	if (media && typeof media === "object") caption = media.caption;

	return (
		<div className={cn("", { container: position === "default" && enableGutter }, className)}>
			{position === ("fullscreen" as "default" | "fullscreen") && (
				<div className="relative">
					<Media resource={media} src={staticImage} />
				</div>
			)}

			{position === "default" && <Media imgClassName={cn("rounded", imgClassName)} resource={media} src={staticImage} />}

			{caption && (
				<div
					className={cn(
						"mt-6",
						{ container: (position as "default" | "fullscreen") === "fullscreen" && !disableInnerContainer },
						captionClassName,
					)}
				>
					<RichText content={caption} enableGutter={false} />
				</div>
			)}
		</div>
	);
};
