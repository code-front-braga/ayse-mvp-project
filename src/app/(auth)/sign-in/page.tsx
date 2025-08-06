import { AuthCustomImage, AuthHeader, AuthSection, AuthWrapperForms } from '../components';
import SignInForm from './components/sign-in-form';

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
				description="Controle todos os seus gastos em supermercados."
			/>
		</AuthSection>
	);
};

export default SignInPage;
