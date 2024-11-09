import { cn } from "@/lib/utils";

// import { RichText } from "@/components/rich-text";
import { RenderHTML } from "@/components/render-html";

import type { BannerBlocks as BannerBlockProps } from "@/payload-types";

type Props = { className?: string } & BannerBlockProps;

export const BannerBlock = ({ className, content, content_html, style }: Props) => {
	return (
		<div className={cn("mx-auto my-8 w-full", className)}>
			<div
				className={cn("flex items-center rounded border px-6 py-3", {
					"border-border bg-card": style === "info",
					"border-error bg-error/30": style === "error",
					"border-success bg-success/30": style === "success",
					"border-warning bg-warning/30": style === "warning",
				})}
			>
				{/* <RichText content={content ?? ""} enableGutter={false} enableProse={false} /> */}
				<RenderHTML html={content_html ?? ""} />
			</div>
		</div>
	);
};
