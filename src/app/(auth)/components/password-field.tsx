import { Eye, EyeOff } from 'lucide-react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { COLORS } from '@/enums/colors';

import { usePasswordVisibility } from '../hooks/use-password-visibility';

interface PasswordFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	placeholder?: string;
	className?: string;
}

export const PasswordField = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder = '••••••',
	className,
}: PasswordFieldProps<T>) => {
	const { showPassword, toggleVisibility, inputType } = usePasswordVisibility();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					<FormLabel>{label}</FormLabel>
					<div className="relative">
						<FormControl>
							<Input type={inputType} placeholder={placeholder} {...field} />
						</FormControl>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute top-0 right-0"
							onClick={toggleVisibility}
						>
							{showPassword ? (
								<EyeOff color={COLORS.PRIMARY} />
							) : (
								<Eye color={COLORS.PRIMARY} />
							)}
							<span className="sr-only">
								{showPassword ? 'Esconder senha' : 'Mostrar senha'}
							</span>
						</Button>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
