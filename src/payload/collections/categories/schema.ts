import { slugField } from "@/payload/fields/slug/schema";

import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";

import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
	slug: "categories",
	labels: {
		singular: "Category",
		plural: "Categories",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		defaultColumns: ["title", "description", "createdAt", "updatedAt"],
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
			name: "description",
			label: "Description",
			type: "textarea",
			required: false,
			admin: {
				rows: 5,
			},
		},
	],
};
