import {
	FixedToolbarFeature,
	HeadingFeature,
	HTMLConverterFeature,
	InlineToolbarFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/payload/fields/link/link-group";

import type { Block } from "payload";

export const CallToAction: Block = {
	slug: "cta",
	labels: {
		plural: "Calls to Action",
		singular: "Call to Action",
	},
	fields: [
		{
			name: "richText",
			label: false,
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						FixedToolbarFeature(),
						HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
						HTMLConverterFeature({}),
						InlineToolbarFeature(),
					];
				},
			}),
		},
		lexicalHTML("richText", { name: "richText_html" }),
		linkGroup({
			appearances: ["default", "outline"],
			overrides: { maxRows: 2 },
		}),
	],
};
