export const AuthSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="bg-background grid h-full w-full p-6 lg:grid-cols-2 lg:p-0">
			{children}
		</section>
	);
};
