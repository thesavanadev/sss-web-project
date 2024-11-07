import { Block } from "payload";

export const Hero: Block = {
	slug: "hero",
	labels: {
		singular: "Hero Block",
		plural: "Hero Blocks",
	},
	fields: [
		{
			name: "heroType",
			label: "What type of hero do you want?",
			type: "radio",
			required: false,
			options: [
				{
					label: "Homepage Hero",
					value: "homepage",
				},
				{
					label: "Subpage Hero",
					value: "subpage",
				},
			],
			defaultValue: "subpage",
			admin: {
				layout: "horizontal",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "heroSubtitle",
					label: "Subtitle",
					type: "text",
					required: false,
					admin: {
						width: "50%",
					},
				},
				{
					name: "heroTitle",
					label: "Title",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "heroMessage",
			label: "Message",
			type: "textarea",
			required: false,
		},
		{
			name: "heroCover",
			label: "Cover Image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "heroCTA",
			label: "Call to Action",
			labels: {
				singular: "Call to Action Link",
				plural: "Call to Action Link",
			},
			type: "array",
			required: false,
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "heroCTALabel",
							label: "Link Label",
							type: "text",
							required: true,
							admin: {
								width: "50%",
							},
						},
						{
							name: "heroCTAUrl",
							label: "Link URL",
							type: "text",
							required: true,
							admin: {
								width: "50%",
							},
						},
					],
				},
			],
			minRows: 1,
			maxRows: 1,
			admin: {
				condition: (_, siblingData) => (siblingData?.heroType === "homepage" ? true : false),
			},
		},
	],
};
