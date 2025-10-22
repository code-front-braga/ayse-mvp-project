import '@/app/styles/globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';

import { Toaster } from '@/components/ui/sonner';

import { fonts } from './styles/fonts';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="pt-BR">
			<body
				className={`${fonts.inter.className} ${fonts.alumni.className} ${fonts.zain.className} antialiased`}
			>
				{children}
				<GoogleAnalytics gaId="G-9KW27EV2L1" />
				<Toaster richColors position="top-left" />
			</body>
		</html>
	);
}
