import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/auth';

interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) redirect(AppRoutes.DASHBOARD_OVERVIEW);

	return (
		<main className="bg-primary-foreground flex h-screen w-full items-center justify-center">
			{children}
		</main>
	);
};

export default AuthLayout;
