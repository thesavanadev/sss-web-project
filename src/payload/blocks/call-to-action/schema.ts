import {
	FixedToolbarFeature,
	HeadingFeature,
	HTMLConverterFeature,
	InlineToolbarFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { Block } from "payload";

export const CallToAction: Block = {
	slug: "cta",
	labels: {
		plural: "Calls to Action Blocks",
		singular: "Call to Action Block",
	},
	fields: [
		{
			name: "ctaCover",
			label: "Cover Image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "ctaContent",
			label: "Content",
			type: "richText",
			required: true,
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
		lexicalHTML("ctaContent", { name: "ctaContent_html" }),
		{
			name: "ctaLink",
			label: "Call to Action Link",
			labels: {
				singular: "Call to Action Link",
				plural: "Calls to Action Links",
			},
			type: "array",
			required: false,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "navigationLinkLabel",
							label: "Navigation Link Label",
							type: "text",
							required: true,
							admin: {
								width: "50%",
							},
						},
						{
							name: "navigationLinkURL",
							label: "Navigation Link URL",
							type: "text",
							required: true,
							admin: {
								width: "50%",
							},
						},
						{
							name: "navigationLinkNewTab",
							label: "Open in New Tab",
							type: "checkbox",
							required: false,
						},
					],
				},
			],
			minRows: 1,
			maxRows: 1,
		},
	],
};
