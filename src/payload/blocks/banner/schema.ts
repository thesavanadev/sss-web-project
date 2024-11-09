import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const Banner: Block = {
	slug: "banner",
	interfaceName: "BannerBlock",
	fields: [
		{
			name: "style",
			label: "Banner Style",
			type: "select",
			required: true,
			defaultValue: "info",
			options: [
				{ label: "Information", value: "info" },
				{ label: "Warning", value: "warning" },
				{ label: "Error", value: "error" },
				{ label: "Success", value: "success" },
			],
		},
		{
			name: "content",
			label: false,
			type: "richText",
			required: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
				},
			}),
		},
	],
};
