interface NewPurchaseProps {
	params: Promise<{ id: string }>;
}

const NewPurchase = async ({ params }: NewPurchaseProps) => {
	const { id } = await params;

	return <h1>New Purchase {id}</h1>;
};

export default NewPurchase;
