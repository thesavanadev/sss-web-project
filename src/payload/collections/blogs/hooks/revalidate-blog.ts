import type { CollectionAfterChangeHook } from "payload";

import { revalidatePath } from "next/cache";

import type { Blog } from "@/payload-types";

export const revalidateBlog: CollectionAfterChangeHook<Blog> = ({ doc, previousDoc, req: { payload } }) => {
	if (doc._status === "published") {
		const path = `/blogs/${doc.slug}`;

		payload.logger.info(`Revalidating blog at ${path}...`);

		revalidatePath(path);
	}

	// if the blog post was previously published, we need to revalidate the old path
	if (previousDoc._status === "published" && doc._status !== "published") {
		const oldPath = `/blogs/${previousDoc.slug}`;

		payload.logger.info(`Revalidating old post at ${oldPath}...`);

		revalidatePath(oldPath);
	}

	return doc;
};
