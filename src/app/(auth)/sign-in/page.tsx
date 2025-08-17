import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';

import { AuthCustomImage } from '../components/auth-custom-image';
import { AuthHeader } from '../components/auth-header';
import { AuthSection } from '../components/auth-section';
import { AuthWrapperForms } from '../components/auth-wrapper-forms';
import { SignInForm } from './components/sign-in-form';

const SignInPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user.id) redirect(AppRoutes.DASHBOARD_OVERVIEW);
	return (
		<AuthSection>
			<AuthWrapperForms>
				<AuthHeader />
				<SignInForm />
			</AuthWrapperForms>
			<AuthCustomImage
				src="/auth_bg.jpg"
				alt="Uma mulher segurando e olhando para um celular."
				description="Faça login e comece a gerenciar seus gastos."
			/>
		</AuthSection>
	);
};

export default SignInPage;
