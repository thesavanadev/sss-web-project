import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

const NotFound = () => {
	return (
		<Container>
			<div className="px-3 py-64">
				<div className="prose max-w-none">
					<h1 className="font-header text-primary">404</h1>
					<p className="mb-5 text-primary">The page you are looking for could not be found.</p>
				</div>

				<Button asChild variant="default">
					<Link href="/">Go Home</Link>
				</Button>
			</div>
		</Container>
	);
};

export default NotFound;
