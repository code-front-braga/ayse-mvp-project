'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { ChartNoAxesCombined } from 'lucide-react';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SmartAuthButton } from '@/components/smart-auth-button';
import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/enums/app-routes';

const LandingHeader = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push(AppRoutes.SIGN_IN);

		sendGAEvent('event', 'form_clicked', { value: 'to_sign_in' });
	};

	return (
		<header className="container mx-auto px-4 py-4 sm:py-6">
			<nav className="flex items-center justify-between">
				<div className="flex items-center gap-2 sm:gap-3">
					<ChartNoAxesCombined className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
					<div className="flex flex-col">
						<span className="text-lg font-bold text-gray-900 sm:text-2xl">
							ayse
						</span>
						<span className="-mt-1 hidden text-xs text-gray-500 sm:block">
							all your supermarket expenses
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2 text-black sm:gap-4">
					<Button onClick={handleClick} variant="ghost" size="sm" className="">
						{/* <Link href={AppRoutes.SIGN_IN} prefetch={true}> */}
						Entrar
						{/* </Link> */}
					</Button>
					<SmartAuthButton
						size="sm"
						className="px-3 text-xs sm:px-4 sm:text-sm"
					>
						<span className="sm:hidden">Começar</span>
						<span className="hidden sm:inline">Começar Agora</span>
					</SmartAuthButton>
				</div>
			</nav>
		</header>
	);
};

export default LandingHeader;
