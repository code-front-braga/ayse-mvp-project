import { Ellipsis, Text } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { COLORS } from '@/enums/colors';

interface ActionDropdownProps {
	editChildren: React.ReactNode;
	deleteChildren: React.ReactNode;
}

const ActionDropdown = ({
	editChildren,
	deleteChildren,
}: ActionDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex justify-end">
					<Button
						size="icon"
						variant="ghost"
						className="text-muted-foreground/60 shadow-none"
						aria-label="Edit item"
					>
						<Ellipsis
							size={20}
							color={COLORS.PRIMARY}
							aria-hidden="true"
							className="size-5"
						/>
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-auto">
				<DropdownMenuItem variant="default">{editChildren}</DropdownMenuItem>
				<DropdownMenuItem>
					<Text />
					Ver Detalhes
				</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">
					{deleteChildren}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ActionDropdown;
