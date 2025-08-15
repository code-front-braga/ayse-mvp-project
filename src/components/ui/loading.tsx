import { cn } from '@/lib/utils';

import { Spinner } from './kibo-ui/spinner';

interface LoadingProps {
	variant?: 'default' | 'page' | 'inline';
	size?: 'sm' | 'md' | 'lg';
	message?: string;
	className?: string;
}

export const Loading = ({
	variant = 'default',
	size = 'md',
	message,
	className,
}: LoadingProps) => {
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8',
	};

	const variantClasses = {
		default: 'flex items-center justify-center gap-2',
		page: 'flex min-h-[400px] flex-col items-center justify-center gap-4',
		inline: 'inline-flex items-center gap-2',
	};

	return (
		<div className={cn(variantClasses[variant], className)}>
			<Spinner
				variant="circle"
				className={cn(sizeClasses[size], 'text-primary')}
			/>
			{message && (
				<span className="text-muted-foreground text-sm font-medium">
					{message}
				</span>
			)}
		</div>
	);
};
