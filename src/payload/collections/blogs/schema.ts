import {
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { generatePreviewPath } from "@/lib/generate-preview-path";

import { slugField } from "@/payload/fields/slug/schema";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticated-or-published";

import type { CollectionConfig } from "payload";

const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

export const Blogs: CollectionConfig = {
	slug: "blogs",
	labels: {
		singular: "Blog",
		plural: "Blogs",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	admin: {
		defaultColumns: ["title", "slug", "createdAt", "updatedAt"],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "blogs",
				});

				return `${publicURL}${path}`;
			},
		},
		preview: (data) => {
			const path = generatePreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "blogs",
			});

			return `${publicURL}${path}`;
		},
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Page Title",
			type: "text",
			required: true,
		},
		...slugField(),
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
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
										// BlocksFeature({ blocks: [ Banner, Code, MediaBlock ] }),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature(),
									];
								},
							}),
						},
					],
				},
				{
					label: "Meta",
					fields: [],
				},
				{
					name: "meta",
					label: "SEO",
					fields: [],
				},
			],
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100,
			},
		},
		maxPerDoc: 50,
	},
};
