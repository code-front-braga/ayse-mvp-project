import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserByEmail } from '@/actions/user-actions';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/auth';

import AppSidebar from './components/sidebar/app-sidebar';
import { PurchaseFormModalProvider } from './contexts/purchase-form-modal-context';
import QueryClientProviderWrapper from './providers/query-client-provider';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.user) redirect(AppRoutes.SIGN_IN);

	const user = await getUserByEmail(session.user.email);
	if (!user) redirect(AppRoutes.SIGN_IN);

	return (
		<QueryClientProviderWrapper>
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
		</QueryClientProviderWrapper>
	);
};

export default DashboardLayout;
