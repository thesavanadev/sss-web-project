import { FixedToolbarFeature, HTMLConverterFeature, InlineToolbarFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	labels: {
		singular: "Media",
		plural: "Media",
	},
	admin: {
		defaultColumns: ["filename", "mimeType", "alt", "caption", "createdAt", "updatedAt"],
		useAsTitle: "alt",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
		{
			name: "caption",
			type: "richText",
			required: false,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), HTMLConverterFeature({}), InlineToolbarFeature()];
				},
			}),
		},
		lexicalHTML("caption", { name: "caption_html" }),
	],
	upload: {
		mimeTypes: ["image/*"],
		resizeOptions: { width: 1024 },
	},
};
