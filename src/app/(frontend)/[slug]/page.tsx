import { cache } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import { generateMeta } from "@/lib/generate-meta";

import { RenderBlocks } from "@/payload/blocks/render-blocks";

import type { Metadata } from "next";
import type { Page } from "@/payload-types";

export const generateStaticParams = async () => {
	const payload = await getPayloadHMR({ config: config });

	const pages = await payload.find({
		collection: "pages",
		draft: false,
		limit: 1000,
		overrideAccess: false,
	});

	const params = pages.docs
		?.filter((doc) => {
			return doc.slug !== "home";
		})
		.map(({ slug }) => {
			return { slug };
		});

	return params;
};

type Args = { params: Promise<{ slug?: string }> };

const Page = async ({ params: paramsPromise }: Args) => {
	const { slug = "home" } = await paramsPromise;

	let page: Page | null;

	page = await queryPageBySlug({ slug });

	if (!page) {
		return notFound();
	}

	const { layout } = page;

	return (
		<article>
			<RenderBlocks blocks={layout ?? []} />
		</article>
	);
};

export default Page;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
	const { slug = "home" } = await paramsPromise;

	const page = await queryPageBySlug({ slug });

	return generateMeta({ doc: page });
};

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const parsedSlug = decodeURIComponent(slug);

	const payload = await getPayloadHMR({ config: config });

	const result = await payload.find({
		collection: "pages",
		draft,
		limit: 1,
		overrideAccess: draft,
		where: {
			slug: {
				equals: parsedSlug,
			},
		},
	});

	return result.docs?.[0] || null;
});
