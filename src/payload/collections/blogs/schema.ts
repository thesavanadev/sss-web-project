import {
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";

import { generatePreviewPath } from "@/lib/generate-preview-path";

import { slugField } from "@/payload/fields/slug/schema";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticated-or-published";

import { populateAuthors } from "@/payload/collections/blogs/hooks/populate-authors";
import { revalidateBlog } from "@/payload/collections/blogs/hooks/revalidate-blog";

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
			name: "authors",
			type: "relationship",
			relationTo: "users",
			hasMany: true,
			admin: {
				position: "sidebar",
			},
		},
		// This field is only used to populate the user data via the `populateAuthors` hook
		// This is because the `user` collection has access control locked to protect user privacy
		// GraphQL will also not return mutated user data that differs from the underlying schema
		{
			name: "populatedAuthors",
			type: "array",
			access: {
				update: () => false,
			},
			admin: {
				disabled: true,
				readOnly: true,
			},
			fields: [
				{
					name: "id",
					type: "text",
				},
				{
					name: "name",
					type: "text",
				},
			],
		},
		{
			name: "publishedOn",
			label: "Published On",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayOnly",
					displayFormat: "do MMM yyyy",
				},
				position: "sidebar",
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === "published" && !value) {
							return new Date();
						}
						return value;
					},
				],
			},
		},
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
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),
						MetaDescriptionField({}),
						PreviewField({
							hasGenerateFn: true,
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [revalidateBlog],
		afterRead: [populateAuthors],
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
