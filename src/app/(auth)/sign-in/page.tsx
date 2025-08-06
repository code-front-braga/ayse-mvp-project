import AuthCustomImage from '../components/auth-custom-image';
import { AuthHeader } from '../components/auth-header';
import AuthSection from '../components/auth-section';
import AuthWrapperForms from '../components/auth-wrapper-forms';

const SignInPage = () => {
	return (
		<AuthSection>
			<AuthWrapperForms>
				<AuthHeader />
				{/* <SignInForm /> */}
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
