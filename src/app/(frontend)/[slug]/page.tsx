import { cache } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import { RenderBlocks } from "@/payload/blocks/render-blocks";

import type { Page } from "@/payload-types";

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const parsedSlug = decodeURIComponent(slug);

	const data = await getPayloadHMR({ config: config });

	const result = await data.find({
		collection: "pages",
		draft,
		limit: 1,
		overrideAccess: true,
		where: {
			slug: {
				equals: parsedSlug,
			},
		},
	});

	return result.docs?.[0] || null;
});

export const generateStaticParams = async () => {
	const data = await getPayloadHMR({ config: config });

	const pages = await data.find({
		collection: "pages",
		draft: false,
		limit: 1000,
		overrideAccess: false,
	});

	return pages.docs
		?.filter((doc: Page) => {
			return doc.slug !== "home";
		})
		.map(({ slug }: Page) => slug);
};

const Page = async ({ params }: { params: Promise<{ slug?: string }> }) => {
	const { slug = "home" } = await params;

	let page: Page | undefined | null;

	page = await queryPageBySlug({ slug });

	if (!page) {
		return notFound();
	}

	const { layout } = page;

	return (
		<article className="pb-16 pt-5">
			<RenderBlocks blocks={layout ?? []} />
		</article>
	);
};

export default Page;
