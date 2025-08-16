'use client';

import { User } from 'generated/prisma';
import { ImageIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { stringUtils } from '@/helpers/string-utils';

interface ProfileImageFormProps {
  user: Pick<User, 'id' | 'name' | 'email' | 'image'>;
}

export default function ProfileImageForm({ user }: ProfileImageFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagem de Perfil</CardTitle>
        <CardDescription>
          Atualize sua imagem de perfil. Esta funcionalidade é apenas visual.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Avatar className="size-24">
            <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
            <AvatarFallback className="text-xl">
              {stringUtils.getFirstLettersUpperCase(user.name!)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" className="gap-2">
              <ImageIcon className="size-4" />
              Alterar imagem
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              Remover
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Formatos suportados: JPEG, PNG, GIF. Tamanho máximo: 2MB.
        </p>
      </CardContent>
    </Card>
  );
}
