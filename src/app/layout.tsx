import './globals.css';

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
};

export default RootLayout;
