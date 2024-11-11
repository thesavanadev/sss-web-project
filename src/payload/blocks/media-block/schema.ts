import type { Block } from "payload";

export const MediaBlock: Block = {
	slug: "mediaBlock",
	interfaceName: "MediaBlock",
	fields: [
		{
			name: "position",
			label: "Media Position",
			type: "select",
			required: false,
			defaultValue: "default",
			options: [
				{
					label: "Default",
					value: "default",
				},
				{
					label: "Fullscreen",
					value: "fullscreen",
				},
			],
		},
		{
			name: "media",
			label: "Media",
			type: "upload",
			relationTo: "media",
			required: true,
		},
	],
};
