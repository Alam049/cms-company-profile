"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  title?: string
  label?:string
  onClickCreate?: () => void
}


export function DataTableV2Testing<T>({data, columns, title, label, onClickCreate}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pageSize, setPageSize] = React.useState(10)
  const [selectedFilter, setSelectedFilter] = React.useState<string | undefined>("");
  const [filterValue, setFilterValue] = React.useState<string | undefined>("");
  

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    if (selectedFilter && table.getColumn(selectedFilter)) {
      table.getColumn(selectedFilter)?.setFilterValue(filterValue);
    }
  }, [filterValue, selectedFilter, table]);
  


  return (
    <div className="w-full px-10">
       <div className="flex items-center gap-6">
        {title && <h1 className="mb-2 text-2xl font-bold">{title}</h1>}
        {onClickCreate && (
          <Button onClick={onClickCreate}>
            {label}
          </Button>
        )}
      </div>
        <div className="flex items-center py-4 gap-4">
      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
          {columns.filter(col => col.id !== "actions").map((col, index) => (
            <SelectItem 
            key={col.id ??  `column-${index}`} 
            value={col.accessorKey as string || col.id}
          >
            {col.id || col.accessorKey}
          </SelectItem>
            ))}
          </SelectContent>
        </Select>
      <Input
          placeholder={`Filter by ${selectedFilter}...`}
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Views <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border border-gray-800">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
  <div className="flex-1 text-sm text-muted-foreground flex items-center gap-5">
  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
  {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{" "}
  of {table.getFilteredRowModel().rows.length} results.
    <div className="flex items-center gap-1">
      <span>Rows per page</span>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => {
          const newSize = value === "All" ? table.getPageCount() * table.getState().pagination.pageSize : Number(value);
          setPageSize(newSize);
          table.setPageSize(newSize);
        }}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 15, 25, 50].map((size) => (
            <SelectItem key={size} value={String(size)}>{size}</SelectItem>
          ))}
          <SelectItem value="All">All</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>


  <Button
    variant={table.getState().pagination.pageIndex === 0 ? "default" : "outline"}
    size="sm"
    onClick={() => table.setPageIndex(0)}
  >
    1
  </Button>

  {table.getState().pagination.pageIndex > 2 && (
    <span className="text-sm">...</span>
  )}

  {[...Array(table.getPageCount())]
    .map((_, index) => index)
    .filter(index =>
      index !== 0 && 
      index !== table.getPageCount() - 1 && 
      (index === table.getState().pagination.pageIndex ||
        index === table.getState().pagination.pageIndex - 1 ||
        index === table.getState().pagination.pageIndex + 1)
    )
    .map(index => (
      <Button
        key={index}
        variant={table.getState().pagination.pageIndex === index ? "default" : "outline"}
        size="sm"
        onClick={() => table.setPageIndex(index)}
      >
        {index + 1}
      </Button>
    ))}

  {table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
    <span className="text-sm">...</span>
  )}

  {table.getPageCount() > 1 && (
    <Button
      variant={table.getState().pagination.pageIndex === table.getPageCount() - 1 ? "default" : "outline"}
      size="sm"
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
    >
      {table.getPageCount()}
    </Button>
  )}

  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>

    </div>
  )
}
