import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';

import { AuthCustomImage } from '../components/auth-custom-image';
import { AuthHeader } from '../components/auth-header';
import { AuthSection } from '../components/auth-section';
import { AuthWrapperForms } from '../components/auth-wrapper-forms';
import { SignUpForm } from './components/sign-up-form';

const SignUpPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user.id) redirect(AppRoutes.DASHBOARD_OVERVIEW);
	return (
		<AuthSection>
			<AuthWrapperForms>
				<AuthHeader />
				<SignUpForm />
			</AuthWrapperForms>
			<AuthCustomImage
				src="/sign-up.jpg"
				alt="Uma mulher sorrindo."
				description="Crie sua conta e comece a gerenciar seus gastos."
			/>
		</AuthSection>
	);
};

export default SignUpPage;
