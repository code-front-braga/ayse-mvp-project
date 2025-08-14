import { ListFilter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { stringUtils } from '@/helpers/string-utils';

interface StatusFilterPopoverProps {
	onTypeChange: (checked: boolean, value: string) => void;
	typeCounts: Map<string, number>;
	uniqueTypeValues: string[];
	selectedType: string[];
	id: string;
	text: string;
}

const StatusFilterPopover = ({
	id,
	selectedType,
	uniqueTypeValues,
	typeCounts,
	text,
	onTypeChange,
}: StatusFilterPopoverProps) => {
	if (uniqueTypeValues.length === 0) {
		return null;
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<ListFilter className="text-primary -ms-1.5 size-5" />
					Filtro
					{selectedType.length > 0 && (
						<span className="border-border bg-background text-muted-foreground/70 ms-3 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
							{selectedType.length}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto min-w-36 p-3" align="end">
				<div className="space-y-3">
					<div className="text-muted-foreground/60 text-xs font-medium uppercase">
						{text}
					</div>
					<div className="space-y-3">
						{uniqueTypeValues.length === 0 ? (
							<div className="text-muted-foreground text-xs">
								Nenhum {text} disponível para filtrar
							</div>
						) : (
							uniqueTypeValues.map((value, i) => {
								const isSelected = selectedType.includes(value);

								return (
									<div key={value} className="flex items-center gap-2">
										<Checkbox
											id={`${id}-${i}`}
											checked={isSelected}
											onCheckedChange={(checked: boolean) =>
												onTypeChange(checked, value)
											}
										/>
										<Label
											htmlFor={`${id}-${i}`}
											className="flex grow justify-between gap-2 font-normal"
										>
											{stringUtils.toTitleCase(value)}
											<span className="text-muted-foreground ms-2 text-xs">
												{typeCounts.get(value)}
											</span>
										</Label>
									</div>
								);
							})
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default StatusFilterPopover;
