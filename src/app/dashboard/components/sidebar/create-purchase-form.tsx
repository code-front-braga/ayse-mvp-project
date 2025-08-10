'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { SubmitButton } from '@/app/components/shared/submit-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { AppRoutes } from '@/enums/app-routes';
import { cn } from '@/lib/utils';

import { createPurchaseAction } from '../../actions/purchase-actions';
import {
	CreatePurchaseSchema,
	createPurchaseSchema,
} from '../../schemas/purchase-schema';

const CreatePurchaseForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<CreatePurchaseSchema>({
		resolver: zodResolver(createPurchaseSchema),
		defaultValues: {
			supermarket: '',
			address: '',
			date: new Date(),
		},
	});

	const handleSubmit = form.handleSubmit(async (data: CreatePurchaseSchema) => {
		startTransition(async () => {
			try {
				const response = await createPurchaseAction(data);
				const purchaseId = response.id;

				if (response.success) {
					router.push(`{${AppRoutes.DASHBOARD_NEW_PURCHASE}/${purchaseId}}`);
					form.reset();
				}
			} catch (error) {
				console.error(error);
			}
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<FormField
					control={form.control}
					name="supermarket"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Supermercado</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									disabled={isPending}
									placeholder="Nome do Supermercado"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Endereço</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									disabled={isPending}
									placeholder="Endereço do Supermercado"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Data da Compra</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(field.value, 'PPP', { locale: ptBR })
											) : (
												<span>Escolha a data</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										locale={ptBR}
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={date =>
											date > new Date() || date < new Date('1900-01-01')
										}
										captionLayout="dropdown"
									/>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>

				<SubmitButton isLoading={isPending}>Criar Compra</SubmitButton>
			</form>
		</Form>
	);
};

export default CreatePurchaseForm;
