'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/enums/app-routes';
import { authClient } from '@/lib/better-auth-client';

interface SmartAuthButtonProps {
	children: React.ReactNode;
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'sm' | 'lg' | 'default';
	className?: string;
}

export const SmartAuthButton = ({
	children,
	variant = 'default',
	size = 'lg',
	className,
}: SmartAuthButtonProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);

		try {
			const session = await authClient.getSession();

			if (session.data?.user) {
				router.push(AppRoutes.DASHBOARD_OVERVIEW);
			} else {
				router.push(AppRoutes.SIGN_UP);
			}
		} catch (error) {
			console.error('Erro ao verificar sessão:', error);
			router.push(AppRoutes.SIGN_UP);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant={variant}
			size={size}
			className={className}
			onClick={handleClick}
			disabled={isLoading}
		>
			{isLoading ? 'Carregando...' : children}
		</Button>
	);
};
