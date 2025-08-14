import { CircleX, Search } from 'lucide-react';
import { useRef } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
	onChange: (value: string) => void;
	placeholder: string;
	value: string;
	id: string;
	'aria-label'?: string;
}

const SearchInput = ({
	onChange,
	placeholder,
	value,
	id,
	'aria-label': ariaLabel,
}: SearchInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="relative w-full">
			<Input
				id={id}
				ref={inputRef}
				className={cn(
					'peer bg-background from-accent/60 to-accent min-w-60 bg-gradient-to-br ps-9',
					Boolean(value) && 'pe-9',
				)}
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
				type="text"
				aria-label={ariaLabel || placeholder}
			/>
			<div className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
				<Search size={20} aria-hidden="true" className="text-primary" />
			</div>
			{Boolean(value) && (
				<button
					className="text-muted-foreground/60 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					aria-label="Limpar filtro"
					onClick={() => {
						onChange('');
						if (inputRef.current) {
							inputRef.current.focus();
						}
					}}
				>
					<CircleX size={16} aria-hidden="true" />
				</button>
			)}
		</div>
	);
};

export default SearchInput;
