type RenderHTMLProps = {
	html: string;
};

export const RenderHTML = ({ html }: RenderHTMLProps) => {
	const markup = { __html: html };

	return (
		<div
			dangerouslySetInnerHTML={markup}
			className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-a:text-blue-500 hover:prose-a:text-sky-500 prose-code:text-white"
		/>
	);
};
