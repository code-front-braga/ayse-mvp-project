interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
	return (
		<main className="bg-primary-foreground flex h-screen w-full items-center justify-center">
			{children}
		</main>
	);
};

export default AuthLayout;
