import {
	AuthCustomImage,
	AuthHeader,
	AuthSection,
	AuthWrapperForms,
} from '../components';
import { SignInForm } from './components/sign-in-form';

const SignInPage = () => {
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
