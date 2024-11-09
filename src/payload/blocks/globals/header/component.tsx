import { unstable_cache } from "next/cache";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import { NavigationHeader } from "@/components/navigation-header";

const data = await getPayloadHMR({ config: config });

const getNavigationHeader = unstable_cache(
	async () => {
		return await data.findGlobal({
			slug: "header",
		});
	},
	["header"],
	{ revalidate: 20, tags: ["header"] },
);

export const HeaderBlock = async () => {
	const header = await getNavigationHeader();

	return <NavigationHeader header={header} />;
};
