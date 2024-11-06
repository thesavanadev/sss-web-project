import { GlobalConfig } from "payload";

import { anyone } from "@/payload/access/anyone";

export const Footer: GlobalConfig = {
	slug: "footer",
	access: {
		read: anyone,
	},
	fields: [
		{
			name: "logo",
			label: "Site Logo",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "title",
					label: "Site Title",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "slogan",
					label: "Site Slogan",
					type: "text",
					required: false,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "description",
					label: "Site Description",
					type: "textarea",
					required: true,
					admin: {
						rows: 5,
						width: "50%",
					},
				},
				{
					name: "copyright",
					label: "Copyright Notice",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "navigationLinks",
			label: "Navigation Links",
			labels: {
				singular: "Navigation Links",
				plural: "Navigation Links",
			},
			type: "array",
			required: false,
			fields: [
				{
					name: "navigationHeaderOptions",
					label: "Do you need a Navigation Header?",
					type: "radio",
					required: false,
					options: [
						{
							label: "Yes",
							value: "yes",
						},
						{
							label: "No",
							value: "no",
						},
					],
					defaultValue: "no",
					admin: {
						layout: "horizontal",
					},
				},
				{
					name: "navigationHeaderText",
					label: "Navigation Header",
					type: "text",
					required: false,
					admin: {
						condition: (_, siblingData) => siblingData?.navigationHeaderOptions === "yes",
						width: "50%",
					},
				},
				{
					name: "navigationLink",
					label: "Links",
					labels: {
						singular: "Navigation Link",
						plural: "Navigation Links",
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
							],
						},
					],
					minRows: 1,
					maxRows: 5,
				},
			],
			minRows: 1,
			maxRows: 5,
		},
	],
};
