import { TriangleAlert } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ActionDialogDeleteItemProps {
	descriptionText: string;
	handleDelete: () => void;
	isUpdatePending: boolean;
}

const ActionDialogDeleteItem = ({
	handleDelete,
	isUpdatePending,
	descriptionText,
}: ActionDialogDeleteItemProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger>Deletar</AlertDialogTrigger>

			<AlertDialogContent>
				<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
					<div
						className="border-border flex size-9 shrink-0 items-center justify-center rounded-full border"
						aria-hidden="true"
					>
						<TriangleAlert className="opacity-80" size={16} />
					</div>
					<AlertDialogHeader>
						<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta ação não poderá ser desfeita. Isso irá deletar
							permanentemente {descriptionText}
						</AlertDialogDescription>
					</AlertDialogHeader>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isUpdatePending}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isUpdatePending}
						className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
					>
						Deletar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ActionDialogDeleteItem;
