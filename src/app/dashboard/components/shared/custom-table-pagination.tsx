'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/components/ui/pagination';
import { useIsMobile } from '@/hooks/use-mobile';

interface CustomTablePaginationProps {
	canPreviousPage: boolean;
	onPrevious: () => void;
	canNextPage: boolean;
	onNext: () => void;
	pageCount: number;
	pageIndex: number;
}

const CustomTablePagination = ({
	canPreviousPage,
	onPrevious,
	canNextPage,
	onNext,
	pageCount,
	pageIndex,
}: CustomTablePaginationProps) => {
	const isMobile = useIsMobile();

	return (
		<div className="flex items-center justify-between pt-2">
			<span className="text-muted-foreground text-xs md:text-sm">
				Página {pageIndex + 1} de {pageCount}
			</span>
			<Pagination className="w-auto">
				<PaginationContent className="gap-3">
					<PaginationItem>
						<Button
							variant="default"
							size={isMobile ? 'icon' : 'default'}
							onClick={onPrevious}
							disabled={!canPreviousPage}
						>
							{isMobile ? <ChevronLeft /> : 'Anterior'}
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							variant="default"
							size={isMobile ? 'icon' : 'default'}
							onClick={onNext}
							disabled={!canNextPage}
						>
							{isMobile ? <ChevronRight /> : 'Próxima'}
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default CustomTablePagination;
