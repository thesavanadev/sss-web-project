import { Container } from "@/components/container";
import { RenderHTML } from "@/components/render-html";

type ContentPadBlockProps = {
	content_html: string;
};

export const ContentPadBlock = ({ content_html }: ContentPadBlockProps) => {
	return (
		<Container className="my-16">
			<>{content_html && <RenderHTML content={content_html} />}</>
		</Container>
	);
};
