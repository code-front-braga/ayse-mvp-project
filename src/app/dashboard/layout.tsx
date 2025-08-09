import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/auth';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) redirect(AppRoutes.SIGN_IN);

	return (
		<div className="bg-background min-h-screen">
			<header className="bg-card border-b">
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<h1 className="text-2xl font-bold">Dashboard</h1>
				</div>
			</header>

			<main className="container mx-auto px-4 py-6">{children}</main>
		</div>
	);
};

export default DashboardLayout;
