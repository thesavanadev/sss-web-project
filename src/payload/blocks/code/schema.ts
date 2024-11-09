import type { Block } from "payload";

export const Code: Block = {
	slug: "code",
	interfaceName: "CodeBlocks",
	fields: [
		{
			name: "language",
			label: "Language",
			type: "select",
			required: false,
			defaultValue: "typescript",
			options: [
				{
					label: "Typescript",
					value: "typescript",
				},
				{
					label: "Javascript",
					value: "javascript",
				},
				{
					label: "CSS",
					value: "css",
				},
			],
		},
		{
			name: "code",
			label: false,
			type: "code",
			required: true,
		},
	],
};
