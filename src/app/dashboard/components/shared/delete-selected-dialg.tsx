import { Trash, TriangleAlert } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteSelectedDialogProps {
	selectedCount: number;
	onDelete: () => void;
	singularText: string;
	pluralText: string;
}

const DeleteSelectedDialog = ({
	selectedCount,
	onDelete,
	singularText,
	pluralText,
}: DeleteSelectedDialogProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">
					<Trash className="-ms-1" size={16} />
					Deletar
					<span className="border-border bg-background text-muted-foreground ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
						{selectedCount}
					</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
					<div className="border-border flex size-9 shrink-0 items-center justify-center rounded-full border">
						<TriangleAlert className="opacity-80" size={16} />
					</div>
					<AlertDialogHeader>
						<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta ação não poderá ser desfeita. Isso irá deletar
							permanentemente {selectedCount}{' '}
							{selectedCount === 1 ? `${singularText}` : `${pluralText}`}
						</AlertDialogDescription>
					</AlertDialogHeader>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<Button variant="destructive" onClick={onDelete}>
						Deletar
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteSelectedDialog;
