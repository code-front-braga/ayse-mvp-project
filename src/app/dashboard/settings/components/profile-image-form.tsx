'use client';

import { User } from 'generated/prisma';
import { ImageIcon, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { updateUserImageAction } from '@/actions/user-actions/update-user-image-action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/kibo-ui/spinner';
import { stringUtils } from '@/helpers/string-utils';

interface ProfileImageFormProps {
	user: Pick<User, 'id' | 'name' | 'email' | 'image'>;
}

export default function ProfileImageForm({ user }: ProfileImageFormProps) {
	const [file, setFile] = useState<File | null>(null);
	const [url, setUrl] = useState<string | null>(user.image || null);
	const [uploading, setUploading] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const inputRef = useRef<HTMLInputElement | null>(null);

	// Otimizar com useCallback
	const handleAvatarClick = useCallback(() => {
		inputRef.current?.click();
	}, []);

	const uploadFile = useCallback(async () => {
		startTransition(async () => {
			try {
				if (!file) {
					toast.error('Nenhum arquivo selecionado');
					return;
				}

				setUploading(true);
				const data = new FormData();
				data.set('file', file);
				const uploadRequest = await fetch('/api/image', {
					method: 'POST',
					body: data,
				});
				const signedUrl = await uploadRequest.json();
				setUrl(signedUrl);
				setUploading(false);

				// Atualizar a imagem no banco de dados
				const result = await updateUserImageAction(signedUrl);
				if (result.error) {
					toast.error(result.error);
					return;
				}
				toast.success('Imagem atualizada com sucesso!');
			} catch (e) {
				console.log(e);
				setUploading(false);
				toast.error('Erro ao fazer upload da imagem');
			}
		});
	}, [file]);

	useEffect(() => {
		if (file) {
			uploadFile();
		}
	}, [file, uploadFile]);

	const removeImage = useCallback(() => {
		startTransition(async () => {
			try {
				setUploading(true); // Adicionar indicador de carregamento
				const result = await updateUserImageAction(null);
				if (result.error) {
					toast.error(result.error);
					setUploading(false); // Garantir que o indicador de carregamento seja removido em caso de erro
					return;
				}

				// Atualizar todos os estados relevantes
				setUrl(null);
				setFile(null);
				setUploading(false);

				toast.success('Imagem removida com sucesso!');
			} catch (error) {
				setUploading(false); // Garantir que o indicador de carregamento seja removido em caso de erro
				toast.error('Erro ao remover a imagem');
				console.error('Erro ao remover imagem:', error);
			}
		});
	}, []);

	return (
		<Card className="relative">
			<CardHeader>
				<CardTitle>Imagem de Perfil</CardTitle>
				<CardDescription>
					Atualize sua imagem de perfil. Esta funcionalidade é apenas visual.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center space-y-4">
				<div className="flex flex-col items-center gap-4 sm:flex-row">
					<div className="relative">
						<Avatar className="size-24">
							{url ? (
								<AvatarImage
									src={url}
									alt={user.name ?? ''}
									className="object-cover"
								/>
							) : (
								<AvatarFallback className="text-xl">
									{stringUtils.getFirstLettersUpperCase(user.name!)}
								</AvatarFallback>
							)}
						</Avatar>
						{(isPending || uploading) && (
							<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
								<Spinner variant="circle-filled" size={16} color="#fff" />
							</div>
						)}
					</div>
					<div className="flex flex-col gap-2 sm:flex-row">
						<Button
							onClick={handleAvatarClick}
							type="button"
							variant="outline"
							disabled={isPending || uploading}
							className="gap-2"
						>
							<ImageIcon className="size-4" />
							Alterar imagem
						</Button>
						<Button
							type="button"
							variant="outline"
							className="gap-2"
							onClick={removeImage}
							disabled={!url || isPending || uploading}
						>
							<Trash2 className="size-4" />
							Remover
						</Button>
					</div>
				</div>
				<p className="text-muted-foreground text-xs">
					Formatos suportados: JPEG, PNG, GIF. Tamanho máximo: 2MB.
				</p>
			</CardContent>
			<input
				ref={inputRef}
				type="file"
				onChange={e => {
					setFile(e.target.files?.[0] ?? null);
				}}
				accept="image/*"
				className="left-[999px] hidden"
			/>
		</Card>
	);
}
