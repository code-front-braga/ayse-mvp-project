import {
	AuthCustomImage,
	AuthHeader,
	AuthSection,
	AuthWrapperForms,
} from '../components';
import { SignUpForm } from './components/sign-up-form';

const SignUpPage = () => {
	return (
		<AuthSection>
			<AuthWrapperForms>
				<AuthHeader />
				<SignUpForm />
			</AuthWrapperForms>
			<AuthCustomImage
				src="/auth_bg.jpg"
				alt="Uma mulher segurando e olhando para um celular."
				description="Controle todos os seus gastos em supermercados."
			/>
		</AuthSection>
	);
};

export default SignUpPage;
