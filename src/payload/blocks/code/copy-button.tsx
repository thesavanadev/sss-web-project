"use client";

import { useState } from "react";
import { CopyIcon } from "@payloadcms/ui";

import { Button } from "@/components/ui/button";

export const CopyButton = ({ code }: { code: string }) => {
	const [text, setText] = useState("Copy");

	const updateCopyStatus = () => {
		if (text === "Copy") {
			setText("Copied!");
			setTimeout(() => {
				setText("Copy");
			}, 1000);
		}
	};

	return (
		<div className="flex justify-end align-middle">
			<Button
				className="flex gap-1"
				variant={"secondary"}
				onClick={async () => {
					await navigator.clipboard.writeText(code);
					updateCopyStatus();
				}}
			>
				<p>{text}</p>

				<div className="h-6 w-6 dark:invert">
					<CopyIcon />
				</div>
			</Button>
		</div>
	);
};
