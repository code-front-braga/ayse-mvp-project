import { Loading } from '@/components/ui/loading';

const AuthLoading = () => {
	return (
		<main className="bg-primary-foreground flex h-screen w-full items-center justify-center">
			<Loading
				variant="page"
				size="lg"
				message="Verificando autenticação..."
			/>
		</main>
	);
};

export default AuthLoading;
