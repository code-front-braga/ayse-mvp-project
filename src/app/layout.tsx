import '@/app/styles/globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';

import { fonts } from './styles/fonts';

export const metadata: Metadata = {
	title: 'ayse',
	description: 'Aplicação MVP desenvolvida com Next.js e tecnologias modernas',
	keywords: [
		'Next.js',
		'React',
		'TypeScript',
		'Tailwind CSS',
		'MVP',
		'Supermarket',
		'Finance',
		'Control',
		'Money',
		'Dashboard',
		'Panel',
	],
	authors: [{ name: 'Leonardo Braga' }],
	openGraph: {
		title: 'ayse - all your supermarket expenses',
		description:
			'Aplicação MVP desenvolvida com Next.js e tecnologias modernas',
		type: 'website',
		locale: 'pt_BR',
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body
				className={`${fonts.inter.className} ${fonts.alumni.className} ${fonts.zain.className} antialiased`}
			>
				{children}
				<Toaster richColors position="top-left" />
			</body>
		</html>
	);
}
