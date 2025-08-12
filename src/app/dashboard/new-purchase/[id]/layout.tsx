import { AddProductModalProvider } from '../../contexts/add-product-modal-context';

interface NewPurchaseLayoutProps {
	children: React.ReactNode;
}

const NewPurchaseLayout = ({ children }: NewPurchaseLayoutProps) => {
	return (
		<AddProductModalProvider>
			{children}
		</AddProductModalProvider>
	);
};

export default NewPurchaseLayout;