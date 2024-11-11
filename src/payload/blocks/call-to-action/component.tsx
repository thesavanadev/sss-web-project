import { Container } from "@/components/container";
import { RenderHTML } from "@/components/render-html";

import type { Page } from "@/payload-types";

type Props = Extract<Page["layout"][0], { blockType: "cta" }>;

export const CallToActionBlock = ({ richText_html }: Props & { id?: string }) => {
	return (
		<Container className="my-16">
			<div className="flex flex-col gap-8 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
				<div className="flex max-w-[48rem] items-center">{richText_html && <RenderHTML content={richText_html} />}</div>

				<div className="flex flex-col gap-8"></div>
			</div>
		</Container>
	);
};
