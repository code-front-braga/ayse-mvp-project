export const stringUtils = {
	toLowerCase: (value: string): string => value.toLowerCase(),

	toTitleCase: (value: string): string =>
		value
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' '),

	normalize: (value: string): string => value.trim().replace(/\s+/g, ' '),
} as const;
