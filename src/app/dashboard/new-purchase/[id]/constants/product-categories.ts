export const PRODUCT_CATEGORIES = [
	{ value: 'acougue', label: 'Açougue' },
	{ value: 'padaria', label: 'Padaria' },
	{ value: 'hortifruti', label: 'Hortifrúti' },
	{ value: 'laticinios', label: 'Laticínios' },
	{ value: 'bebidas', label: 'Bebidas' },
	{ value: 'higiene-pessoal', label: 'Higiene Pessoal' },
	{ value: 'limpeza', label: 'Limpeza' },
	{ value: 'mercearia', label: 'Mercearia' },
	{ value: 'congelados', label: 'Congelados' },
	{ value: 'doces-sobremesas', label: 'Doces e Sobremesas' },
	{ value: 'cereais-graos', label: 'Cereais e Grãos' },
	{ value: 'condimentos', label: 'Condimentos' },
	{ value: 'conservas', label: 'Conservas' },
	{ value: 'pet-shop', label: 'Pet Shop' },
	{ value: 'casa-jardim', label: 'Casa e Jardim' },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]['value'];

export const categoryValues = PRODUCT_CATEGORIES.map(
	category => category.value,
) as [string, ...string[]];
