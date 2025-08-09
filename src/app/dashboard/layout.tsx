import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/auth';

import AppSidebar from './components/sidebar/app-sidebar';

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
			<AppSidebar />
			<main className="w-full px-4 py-2">
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<SidebarTrigger />
						{/* <DashboardHeader /> */}
						{children}
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
