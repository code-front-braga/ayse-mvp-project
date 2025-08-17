import { Metadata } from 'next';

import ResetPasswordForm from './components/reset-password-form';

export const metadata: Metadata = {
	title: 'Redefinir Senha | Ayse',
	description: 'Redefina sua senha para acessar sua conta Ayse',
};

export default function ResetPasswordPage({
	searchParams,
}: {
	searchParams: { token?: string };
}) {
	const token = searchParams.token;

	return (
		<main className="bg-primary-foreground flex h-screen w-full items-center justify-center">
			<div className="w-full max-w-md px-4">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold">Redefinir Senha</h1>
					<p className="text-muted-foreground mt-2">
						Crie uma nova senha para sua conta
					</p>
				</div>
				<ResetPasswordForm token={token} />
			</div>
		</main>
	);
}
