import '@/app/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';

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
				<Toaster richColors={true} position="top-left" closeButton={true} />
			</body>
		</html>
	);
};

export default RootLayout;
