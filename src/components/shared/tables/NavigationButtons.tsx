import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface NavigationButtonsProps {
    canNextPage: boolean;
    canPreviousPage: boolean;
    pageCount: number;
    nextPage: () => void;
    previousPage: () => void;
    setPageIndex: (pageIndex: number) => void;
}

export default function NavigationButtons({ canNextPage, canPreviousPage, nextPage, previousPage, setPageIndex, pageCount }: NavigationButtonsProps) {
    return (
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => setPageIndex(0)}
                disabled={!canPreviousPage}
            >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="size-4" />
            </Button>
            <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
            >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
            </Button>
            <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => nextPage()}
                disabled={!canNextPage}
            >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
            </Button>
            <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => setPageIndex(pageCount - 1)}
                disabled={!canNextPage}
            >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="size-4" />
            </Button>
        </div>
    );
}