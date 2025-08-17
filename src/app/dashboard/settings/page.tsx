import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../components/shared/dashboard-header';
import DeleteAccountForm from './components/delete-account-form';
import ProfileImageForm from './components/profile-image-form';
import ProfileNameForm from './components/profile-name-form';
import ProfilePasswordForm from './components/profile-password-form';
export default async function SettingsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	const userEmail = session?.user?.email;
	if (!userEmail) redirect(AppRoutes.SIGN_IN);

	const user = await prisma.user.findUnique({
		where: { email: userEmail },
		select: { id: true, name: true, email: true, image: true },
	});

	if (!user) return null;

	return (
		<div className="space-y-6">
			<DashboardHeader
				title="Configurações"
				description="Gereencie suas configurações de conta e preferências."
			/>
			<div className="mx-auto grid w-full max-w-lg gap-6">
				<ProfileImageForm user={user} />
				<ProfileNameForm user={user} />
				<ProfilePasswordForm />
				<DeleteAccountForm user={user} />
			</div>
		</div>
	);
}
