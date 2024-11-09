import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { BoldFeature, ItalicFeature, LinkFeature, ParagraphFeature, UnderlineFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { buildConfig } from "payload";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "@/payload/collections/media/schema";
import { Pages } from "@/payload/collections/pages/schema";
import { Users } from "@/payload/collections/users/schema";

import { Footer } from "@/payload/blocks/globals/footer/schema";
import { Header } from "@/payload/blocks/globals/header/schema";

import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Page } from "@/payload-types";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseURI = process.env.NODE_ENV === "development" ? process.env.DATABASE_URI_DEV! : process.env.DATABASE_URI_PRD!;
const payloadSecret = process.env.PAYLOAD_SECRET!;
const resendAPIKey = process.env.RESEND_API_KEY!;
const uploadthingSecret = process.env.UPLOADTHING_SECRET!;
const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
	return doc?.title ? `${doc.title} | Superior Software Solutions` : "Superior Software Solutions";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
	return doc?.slug ? `${publicURL}/${doc.slug}` : publicURL;
};

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					height: 667,
					width: 375,
				},
				{
					label: "Tablet",
					name: "tablet",
					height: 1024,
					width: 768,
				},
				{
					label: "Desktop",
					name: "desktop",
					height: 900,
					width: 1440,
				},
			],
		},
		user: Users.slug,
	},
	collections: [Pages, Media, Users],
	db: mongooseAdapter({ url: databaseURI }),
	editor: lexicalEditor({
		features: () => {
			return [
				ParagraphFeature(),
				UnderlineFeature(),
				BoldFeature(),
				ItalicFeature(),
				LinkFeature({
					enabledCollections: ["pages"],
					fields: ({ defaultFields }) => {
						const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
							if ("name" in field && field.name === "url") return false;
							return true;
						});

						return [
							...defaultFieldsWithoutUrl,
							{
								name: "url",
								type: "text",
								admin: {
									condition: ({ linkType }) => linkType !== "internal",
								},
								label: ({ t }) => t("fields:enterURL"),
								required: true,
							},
						];
					},
				}),
			];
		},
	}),
	email: resendAdapter({
		defaultFromAddress: "hello@s3.co.ke",
		defaultFromName: "Mailer @ S3",
		apiKey: resendAPIKey,
	}),
	globals: [Header, Footer],
	plugins: [
		seoPlugin({ generateTitle, generateURL }),
		uploadthingStorage({
			collections: {
				[Media.slug]: true,
			},
			options: {
				apiKey: uploadthingSecret,
				acl: "public-read",
			},
		}),
	],
	secret: payloadSecret,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
