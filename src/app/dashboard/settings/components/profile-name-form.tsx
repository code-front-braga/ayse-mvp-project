'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'generated/prisma';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateUserNameAction } from '@/actions/user-actions/update-user-name-action';
import { SubmitButton } from '@/app/components/shared/submit-button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ProfileNameFormProps {
	user: Pick<User, 'id' | 'name' | 'email'>;
}

const formSchema = z.object({
	name: z
		.string()
		.min(2, 'O nome deve ter pelo menos 2 caracteres')
		.max(30, 'O nome deve ter no máximo 30 caracteres'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfileNameForm({ user }: ProfileNameFormProps) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name || '',
		},
	});

	function onSubmit(data: FormValues) {
		startTransition(async () => {
			try {
				const result = await updateUserNameAction(data.name);
				if (result.error) {
					toast.error(result.error);
					return;
				}
				toast.success('Nome atualizado com sucesso!');
			} catch (error) {
				toast.error('Erro ao atualizar o nome.');
				console.error('Erro ao atualizar nome:', error);
			}
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Nome</CardTitle>
				<CardDescription>Atualize seu nome de exibição.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Seu nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end">
							<SubmitButton isLoading={isPending} loadingText="Salvando...">
								Salvar
							</SubmitButton>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
