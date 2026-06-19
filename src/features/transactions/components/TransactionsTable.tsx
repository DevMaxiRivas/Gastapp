import NavigationButtons from "@/components/shared/tables/NavigationButtons";
import NavigationLabel from "@/components/shared/tables/NavigationLabel";
import PageSizeSelect from "@/components/shared/tables/PageSizeSelect";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { useTransactionsTable } from "@/hooks/useTransactionTable";
import { flexRender } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function TransactionsTable() {
  const { table, isLoading, totalElements } = useTransactionsTable();

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    table.setGlobalFilter(debouncedSearch);
  }, [debouncedSearch, table]);

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between items-center mb-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search note..."
          className="w-full sm:w-80"
        />
        <span className="text-sm text-gray-600">
          {totalElements} records found
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/15">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className="h-11 p-3 font-medium">
                    <div
                      className="flex justify-between items-center gap-2 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? <ArrowUp size={16} />
                        : header.column.getIsSorted() === 'desc' ? <ArrowDown size={16} />
                          : <ArrowUpDown size={16} />}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="text-center p-4">
                  Loading records...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center gap-8 px-1 mt-4">
        <NavigationLabel
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
        />
        <NavigationButtons
          canNextPage={table.getCanNextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          nextPage={table.nextPage}
          previousPage={table.previousPage}
          setPageIndex={table.setPageIndex}
          pageCount={table.getPageCount()}
        />
        <PageSizeSelect
          currentPageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
          options={[10, 20, 50, 100]}
        />
      </div>
    </div>
  );
}