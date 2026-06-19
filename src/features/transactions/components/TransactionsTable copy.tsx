import { useDebounce } from "@/hooks/useDebounce";
import { useTransactionsTable } from "@/hooks/useTransactionTable";
import { flexRender } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export function TransactionsTable() {
  const { table, isLoading, totalElements } = useTransactionsTable();

  // Debounce para el input de búsqueda (300ms)
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sincronizar el debounce con el estado global de la tabla
  useEffect(() => {
    table.setGlobalFilter(debouncedSearch);
  }, [debouncedSearch, table]);

  return (
    <div>
      {/* Barra de herramientas */}
      <div className="flex justify-between items-center mb-4">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar por nombre, nota..."
          className="border p-2 rounded w-64"
        />
        <span className="text-sm text-gray-600">
          {totalElements} registros encontrados
        </span>
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 text-left">
                  {/* Header con ordenamiento */}
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span>
                      {header.column.getIsSorted() === 'asc' ? '↑' :
                        header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan={table.getAllColumns().length} className="text-center p-4">Cargando transacciones...</td></tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr><td colSpan={table.getAllColumns().length} className="text-center p-4">No se encontraron resultados</td></tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {'<'}
          </button>
          <span className="px-3 py-1">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {'>'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>

        {/* Selector de tamaño de página */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded p-1"
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>Mostrar {size}</option>
          ))}
        </select>
      </div>
    </div>
  );
}