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
				src="/sign-up.jpg"
				alt="Uma mulher sorrindo."
				description="Crie sua conta e comece a gerenciar seus gastos."
			/>
		</AuthSection>
	);
};

export default SignUpPage;
