import '@/app/styles/globals.css';

import { fonts } from './styles/fonts';

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body
				className={` ${fonts.inter.className} ${fonts.alumni.className} ${fonts.zain.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
