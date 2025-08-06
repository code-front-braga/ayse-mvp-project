interface AuthFormHeaderProps {
	title: string;
	description: string;
}

const AuthFormHeader = ({ title, description }: AuthFormHeaderProps) => {
	return (
		<div className="space-y-2 text-center">
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-muted-foreground text-sm">{description}</p>
		</div>
	);
};

export default AuthFormHeader;
