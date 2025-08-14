export const stringUtils = {
	toLowerCase: (value: string): string => value.toLowerCase(),

	toTitleCase: (value: string): string =>
		value
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' '),

	normalize: (value: string): string => value.trim().replace(/\s+/g, ' '),

	getFirstLettersUpperCase: (value: string): string =>
		value
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2),

	formatDateToBRL: (value: Date) => {
		return value.toLocaleDateString('pt-BR', {
			dateStyle: 'medium',
		});
	},

	formatToCurrencyBRL(value: number | string) {
		if (!value) return '';

		const numericValue = Number(value);
		if (isNaN(numericValue)) return '';

		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
		}).format(numericValue);
	},

	padWithZero: (value: number | string, length: number = 2): string => {
		const numValue = Number(value);
		if (numValue === 0) return '0';
		return String(value).padStart(length, '0');
	},

	multiply: (value: number, multiplier: number): number => {
		return value * multiplier;
	},

	handlePriceChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: number) => void,
	) => {
		const rawValue = e.target.value.replace(/\D/g, '');

		if (!rawValue) {
			onChange(0);
			return;
		}

		const numericValue = Number(rawValue) / 100;
		onChange(numericValue);
	},
} as const;
