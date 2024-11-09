import { unstable_cache } from "next/cache";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import { NavigationFooter } from "@/components/navigation-footer";

export const FooterBlock = async () => {
	const data = await getPayloadHMR({ config: config });

	const getNavigationFooter = unstable_cache(
		async () => {
			return await data.findGlobal({ slug: "footer" });
		},
		["footer"],
		{ revalidate: 60, tags: ["footer"] },
	);

	const footerData = await getNavigationFooter();

	return <NavigationFooter footer={footerData} />;
};
