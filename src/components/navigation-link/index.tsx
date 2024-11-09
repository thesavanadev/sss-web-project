import { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "@/components/ui/button";

import type { Page, Blog } from "@/payload-types";

type NavigationLinkType = {
	appearance?: "inline" | ButtonProps["variant"];
	children?: ReactNode;
	className?: string;
	label?: string | null;
	newTab?: boolean | null;
	reference?: {
		relationTo: "pages" | "blogs";
		value: Page | Blog | string | number;
	} | null;
	size?: ButtonProps["size"] | null;
	type?: "custom" | "reference" | null;
	url?: string | null;
};

export const NavigationLink = (props: NavigationLinkType) => {
	const { type, appearance = "inline", children, className, label, newTab, reference, size: sizeFromProps, url } = props;

	const href =
		type === "reference" && typeof reference?.value === "object" && reference.value.slug
			? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${reference.value.slug}`
			: url;

	if (!href) return null;

	const size = appearance === "link" ? "default" : sizeFromProps;

	const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {};

	/* ensure we don't break any styles set by richText */
	if (appearance === "inline") {
		return (
			<Link className={cn(className)} href={href || url || ""} {...newTabProps}>
				{label && label}
				{children && children}
			</Link>
		);
	}

	return (
		<Button asChild className={className} size={size} variant={appearance}>
			<Link className={cn(className)} href={href || url || ""} {...newTabProps}>
				{label && label}
				{children && children}
			</Link>
		</Button>
	);
};
