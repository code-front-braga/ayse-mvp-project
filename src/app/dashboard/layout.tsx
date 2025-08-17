import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import AppSidebar from './components/sidebar/app-sidebar';
import { PurchaseFormModalProvider } from './contexts/purchase-form-modal-context';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userEmail = session?.user?.email;
	if (!userEmail) redirect(AppRoutes.SIGN_IN);

	const user = await prisma.user.findUnique({
		where: { email: userEmail },
		select: { id: true, name: true, email: true, image: true },
	});
	if (!user) return null;

	return (
		<PurchaseFormModalProvider>
			<SidebarProvider>
				<AppSidebar user={user} />
				<main className="flex flex-1 flex-col px-4">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-2 py-4 md:gap-4 md:py-6">
							<SidebarTrigger />

							{children}
						</div>
					</div>
				</main>
			</SidebarProvider>
		</PurchaseFormModalProvider>
	);
};

export default DashboardLayout;
