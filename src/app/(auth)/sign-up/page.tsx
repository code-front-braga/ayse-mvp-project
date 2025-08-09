import { AuthCustomImage } from '../components/auth-custom-image';
import { AuthHeader } from '../components/auth-header';
import { AuthSection } from '../components/auth-section';
import { AuthWrapperForms } from '../components/auth-wrapper-forms';
import { SignUpForm } from './components/sign-up-form';

const SignUpPage = () => {
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
