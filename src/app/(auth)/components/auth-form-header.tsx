interface AuthFormHeaderProps {
	title: string;
	description: string;
}

export const AuthFormHeader = ({ title, description }: AuthFormHeaderProps) => {
	return (
		<div className="space-y-2 text-center">
			<h2 className="text-lg font-semibold md:text-xl">{title}</h2>
			<p className="text-muted-foreground text-xs md:text-sm">{description}</p>
		</div>
	);
};
