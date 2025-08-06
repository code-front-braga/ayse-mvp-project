import Link from 'next/link';

interface AuthLinkProps {
	href: string;
	text: string;
	linkText: string;
}

const AuthLink = ({ href, text, linkText }: AuthLinkProps) => {
	return (
		<div className="mt-6 text-center text-sm">
			<span className="text-muted-foreground">{text}</span>{' '}
			<Link href={href} className="text-primary font-medium hover:underline">
				{linkText}
			</Link>
		</div>
	);
};

export default AuthLink;
