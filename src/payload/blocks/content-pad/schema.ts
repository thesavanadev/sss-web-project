import {
	FixedToolbarFeature,
	HeadingFeature,
	HTMLConverterFeature,
	InlineToolbarFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { Block } from "payload";

export const ContentPad: Block = {
	slug: "contentPad",
	labels: {
		singular: "Content Pad Block",
		plural: "Content Pad Blocks",
	},
	fields: [
		{
			name: "content",
			label: false,
			type: "richText",
			required: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
						HTMLConverterFeature({}),
					];
				},
			}),
		},
		lexicalHTML("content", { name: "content_html" }),
	],
};
