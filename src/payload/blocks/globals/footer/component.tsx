import { unstable_cache } from "next/cache";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import { NavigationFooter } from "@/components/navigation-footer";

const data = await getPayloadHMR({ config: config });

const getNavigationFooter = unstable_cache(
	async () => {
		return await data.findGlobal({
			slug: "footer",
		});
	},
	["footer"],
	{ revalidate: 20, tags: ["footer"] },
);

export const FooterBlock = async () => {
	const footer = await getNavigationFooter();

	return <NavigationFooter footer={footer} />;
};
