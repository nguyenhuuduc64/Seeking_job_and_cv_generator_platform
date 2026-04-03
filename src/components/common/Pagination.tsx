import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent className="cursor-pointer">
                {/**nút previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
                        className={currentPage === 0 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={currentPage === index}
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/**nút next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            currentPage < totalPages - 1 && onPageChange(currentPage + 1)
                        }
                        className={
                            currentPage === totalPages - 1 ? 'pointer-events-none opacity-50' : ''
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
