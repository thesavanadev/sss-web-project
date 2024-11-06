import { slug } from "@/payload/fields/slug/schema";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticated-or-published";

import { populatePublishedAt } from "@/payload/collections/pages/hooks/populate-published-at";
import { revalidatePage } from "@/payload/collections/pages/hooks/revalidate-page";

import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "Page",
		plural: "Pages",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	admin: {
		defaultColumns: ["title", "slug", "createdAt", "updatedAt"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Page Title",
			type: "text",
			required: true,
		},
		...slug(),
		{
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar",
			},
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "content",
					label: "Content",
					fields: [],
				},
				{
					name: "seo",
					label: "SEO",
					fields: [],
				},
			],
		},
	],
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100,
			},
		},
		maxPerDoc: 50,
	},
};
