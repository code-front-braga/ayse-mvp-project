'use client';

import { User } from 'generated/prisma';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteUserAccountAction } from '@/actions/user-actions/delete-user-account-action';
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
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppRoutes } from '@/enums/app-routes';

interface DeleteAccountFormProps {
	user: Pick<User, 'id' | 'email'>;
}

export default function DeleteAccountForm({ user }: DeleteAccountFormProps) {
	const [isPending, startTransition] = useTransition();
	const [confirmText, setConfirmText] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);
	const router = useRouter();

	const isConfirmValid = confirmText === user.email;

	function handleDeleteAccount() {
		if (!isConfirmValid) return;

		startTransition(async () => {
			try {
				const result = await deleteUserAccountAction();

				if (result.error) {
					toast.error(result.error);
					setDialogOpen(false);
					return;
				}

				toast.success('Sua conta foi excluída com sucesso.');
				router.push(AppRoutes.SIGN_IN);
			} catch (error) {
				toast.error('Erro ao excluir a conta.');
				setDialogOpen(false);
				console.error('Erro ao excluir conta:', error);
			}
		});
	}

	return (
		<Card className="border-destructive/50 bg-sidebar">
			<CardHeader>
				<CardTitle className="text-destructive flex items-center gap-2">
					<AlertTriangle className="size-5" />
					Zona de perigo
				</CardTitle>
				<CardDescription>
					Excluir sua conta é uma ação permanente e não pode ser desfeita.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground mb-4 text-sm">
					Todos os seus dados serão permanentemente removidos. Esta ação não
					pode ser desfeita.
				</p>

				<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Excluir minha conta</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
							<AlertDialogDescription>
								Esta ação não pode ser desfeita. Isso excluirá permanentemente
								sua conta e removerá seus dados dos nossos servidores.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<div className="space-y-2 py-2">
							<Label htmlFor="confirm" className="text-sm font-medium">
								Digite seu email para confirmar:{' '}
								<span className="font-bold">{user.email}</span>
							</Label>
							<Input
								id="confirm"
								value={confirmText}
								onChange={e => setConfirmText(e.target.value)}
								placeholder={user.email}
								className="w-full"
							/>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteAccount}
								disabled={!isConfirmValid || isPending}
								className="bg-destructive hover:bg-destructive/90 text-white"
							>
								{isPending ? 'Excluindo...' : 'Excluir conta'}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	);
}
