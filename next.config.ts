import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
			},
			{
				protocol: "https",
				hostname: "s3.co.ke",
				port: "",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/a/lvo9tx8j15/**",
			},
		],
	},
};

export default withPayload(nextConfig);
