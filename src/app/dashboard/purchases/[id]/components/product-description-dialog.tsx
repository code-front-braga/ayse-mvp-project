import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';

interface ProductDescriptionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	productName: string;
	description: string | null;
}

const ProductDescriptionDialog = ({
	open,
	onOpenChange,
	productName,
	description,
}: ProductDescriptionDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Descrição do Produto: {productName}</DialogTitle>
					<DialogDescription>
						{description || 'Nenhuma descrição disponível para este produto.'}
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ProductDescriptionDialog;
