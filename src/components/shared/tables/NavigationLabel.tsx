export default function NavigationLabel({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
    return (
        <div className="flex w-fit items-center justify-center font-medium text-sm">
            Page {currentPage} of {totalPages}
        </div>
    )
}