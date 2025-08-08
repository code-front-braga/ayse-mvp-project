import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/kibo-ui/spinner';

interface SubmitButtonProps {
	isLoading: boolean;
	loadingText?: string;
	children: React.ReactNode;
	className?: string;
}

export const SubmitButton = ({
	isLoading,
	loadingText = 'Processando...',
	children,
	className = 'w-full',
}: SubmitButtonProps) => {
	return (
		<Button type="submit" className={className} disabled={isLoading}>
			{isLoading ? (
				<>
					<Spinner variant="bars" className="mr-2" />
					{loadingText}
				</>
			) : (
				children
			)}
		</Button>
	);
};
