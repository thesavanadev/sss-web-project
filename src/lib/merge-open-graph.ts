import type { Metadata } from "next";

const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"Superior Software Solutions: Bringing the best process thinking to every project creating alignment, momentum and delivering the expected results that drive customer growth.",
	images: [
		{
			url: publicURL ? `${publicURL}/sss-og.webp` : "/sss-og.webp",
		},
	],
	siteName: "Superior Software Solutions",
	title: "Superior Software Solutions",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
