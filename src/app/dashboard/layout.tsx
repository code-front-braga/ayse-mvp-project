import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SidebarProvider } from '@/components/ui/sidebar';
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
		<SidebarProvider>
			<main>
				<div>
					<div>{children}</div>
				</div>
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
