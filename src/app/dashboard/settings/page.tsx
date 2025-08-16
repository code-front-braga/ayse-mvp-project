import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../components/shared/dashboard-header';
import DeleteAccountForm from './components/delete-account-form';
import ProfileImageForm from './components/profile-image-form';
import ProfileNameForm from './components/profile-name-form';
import ProfilePasswordForm from './components/profile-password-form';

export default async function SettingsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;

	if (!userId) return null;

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true, name: true, email: true, image: true },
	});

	if (!user) return null;

	return (
		<div className="space-y-6">
			<DashboardHeader
				title="Configurações"
				description="Gereencie suas configurações de conta e preferências."
			/>
			<div className="grid gap-6">
				<ProfileImageForm user={user} />
				<ProfileNameForm user={user} />
				<ProfilePasswordForm />
				<DeleteAccountForm user={user} />
			</div>
		</div>
	);
}
