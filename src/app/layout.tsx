import '@/app/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MVP Ayse',
	description: 'Aplicação MVP desenvolvida com Next.js e tecnologias modernas',
	keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MVP'],
	authors: [{ name: 'MVP Ayse Team' }],
	openGraph: {
		title: 'MVP Ayse',
		description:
			'Aplicação MVP desenvolvida com Next.js e tecnologias modernas',
		type: 'website',
		locale: 'pt_BR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'MVP Ayse',
		description:
			'Aplicação MVP desenvolvida com Next.js e tecnologias modernas',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				{children}
				<Toaster richColors position="top-left" />
			</body>
		</html>
	);
}
