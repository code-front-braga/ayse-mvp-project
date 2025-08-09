import { ChartNoAxesCombined } from 'lucide-react';
import Link from 'next/link';

const LandingFooter = () => {
	return (
		<footer className="bg-gray-900 py-8 text-white sm:py-12">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center justify-between space-y-4 sm:space-y-0 md:flex-row">
					<div className="flex items-center gap-2">
						<ChartNoAxesCombined className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
						<span className="text-lg font-bold sm:text-xl">ayse</span>
					</div>
					<div className="flex gap-4 text-sm sm:gap-6 sm:text-base">
						<Link
							href="#"
							className="text-gray-400 transition-colors hover:text-white"
						>
							Privacidade
						</Link>
						<Link
							href="#"
							className="text-gray-400 transition-colors hover:text-white"
						>
							Termos
						</Link>
						<Link
							href="#"
							className="text-gray-400 transition-colors hover:text-white"
						>
							Suporte
						</Link>
					</div>
				</div>
				<div className="mt-6 border-t border-gray-800 pt-6 text-center text-gray-400 sm:mt-8 sm:pt-8">
					<p className="text-xs sm:text-sm">
						&copy; 2025 ayse. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default LandingFooter;
