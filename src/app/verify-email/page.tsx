'use client';

import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AppRoutes } from '@/enums/app-routes';
import { authClient } from '@/lib/auth-client';

export default function VerifyEmailPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'loading',
	);
	const [message, setMessage] = useState('Verificando seu email...');

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				// Extrair todos os parâmetros da URL
				const token = searchParams.get('token');

				if (!token) {
					setStatus('error');
					setMessage('Token de verificação não encontrado');
					setTimeout(() => router.push('/'), 3000);
					return;
				}

				// Construir a URL original do Better Auth com todos os parâmetros
				const params = new URLSearchParams();
				searchParams.forEach((value, key) => {
					params.append(key, value);
				});

				// Fazer a verificação através da API original do Better Auth
				const response = await fetch(
					`/api/auth/verify-email?${params.toString()}`,
					{
						method: 'GET',
						credentials: 'include', // Importante para incluir cookies de sessão
					},
				);

				if (response.ok) {
					setStatus('success');
					setMessage('Email verificado com sucesso! Verificando sessão...');

					// Aguardar um pouco e verificar se a sessão foi criada
					setTimeout(async () => {
						try {
							// Verificar se o usuário está logado
							const session = await authClient.getSession();

							if (session.data?.user) {
								setMessage('Logado com sucesso! Redirecionando...');
								// Usuário está logado, redirecionar para o dashboard
								setTimeout(() => {
									window.location.href = AppRoutes.DASHBOARD_OVERVIEW;
								}, 1000);
							} else {
								// Sessão não foi criada, tentar fazer login manual
								setMessage('Finalizando login...');
								// Aguardar mais um pouco e tentar novamente
								setTimeout(() => {
									window.location.href = AppRoutes.DASHBOARD_OVERVIEW;
								}, 2000);
							}
						} catch (sessionError) {
							console.error('Erro ao verificar sessão:', sessionError);
							// Mesmo com erro na verificação de sessão, tentar redirecionar
							window.location.href = AppRoutes.DASHBOARD_OVERVIEW;
						}
					}, 1000);
				} else {
					setStatus('error');
					setMessage(
						'Falha na verificação do email. O link pode ter expirado.',
					);
					setTimeout(() => router.push('/'), 3000);
				}
			} catch (error) {
				console.error('Erro ao verificar email:', error);
				setStatus('error');
				setMessage('Erro ao verificar email. Tente novamente.');
				setTimeout(() => router.push('/'), 3000);
			}
		};

		verifyEmail();
	}, [router, searchParams]);

	const getIcon = () => {
		switch (status) {
			case 'loading':
				return (
					<Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-500" />
				);
			case 'success':
				return <CheckCircle className="mx-auto mb-4 h-8 w-8 text-green-500" />;
			case 'error':
				return <XCircle className="mx-auto mb-4 h-8 w-8 text-red-500" />;
		}
	};

	const getTextColor = () => {
		switch (status) {
			case 'loading':
				return 'text-gray-900';
			case 'success':
				return 'text-green-900';
			case 'error':
				return 'text-red-900';
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="text-center">
				{getIcon()}
				<h1 className={`mb-2 text-xl font-semibold ${getTextColor()}`}>
					{status === 'loading' && 'Verificando seu email...'}
					{status === 'success' && 'Email verificado!'}
					{status === 'error' && 'Erro na verificação'}
				</h1>
				<p className="text-gray-600">{message}</p>
			</div>
		</div>
	);
}
