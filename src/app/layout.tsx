import '@/app/styles/globals.css';

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
				<Toaster richColors position="top-left" />
			</body>
		</html>
	);
}
