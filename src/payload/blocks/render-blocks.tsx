import { Fragment } from "react";

import { CallToActionBlock } from "@/payload/blocks/call-to-action/component";
import { ContentPadBlock } from "@/payload/blocks/content-pad/component";
import { HeroBlock } from "@/payload/blocks/hero/component";
import { MediaBlock } from "@/payload/blocks/media-block/component";

import type { Page } from "@/payload-types";

// mapping block slugs to their respective components
const blockComponents = {
	contentPad: ContentPadBlock,
	cta: CallToActionBlock,
	hero: HeroBlock,
	mediaBlock: MediaBlock,
};

export const RenderBlocks = (props: { blocks: Page["layout"][0][] }) => {
	const { blocks } = props;

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

	if (hasBlocks) {
		return (
			<Fragment>
				{blocks.map((block, index) => {
					const { blockType } = block;

					if (blockType && blockType in blockComponents) {
						const Block = blockComponents[blockType as keyof typeof blockComponents];

						if (Block) {
							return (
								<div key={index}>
									<Block {...(block as any)} />
								</div>
							);
						}
					}

					return null;
				})}
			</Fragment>
		);
	}

	return null;
};
