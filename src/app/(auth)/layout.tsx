const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="bg-primary-foreground flex h-screen w-full items-center justify-center">
			{children}
		</main>
	);
};

export default AuthLayout;
