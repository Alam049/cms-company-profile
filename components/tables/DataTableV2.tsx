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
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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


const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
    {
      id: "z8x72qlo",
      amount: 530,
      status: "success",
      email: "luke@example.com",
    },
    {
      id: "n4h2jq7d",
      amount: 195,
      status: "processing",
      email: "emily@example.com",
    },
    {
      id: "r6y5w3pt",
      amount: 610,
      status: "failed",
      email: "jacob@example.com",
    },
    {
      id: "k9e4ml2g",
      amount: 980,
      status: "success",
      email: "sophia@example.com",
    },
    {
      id: "p3a8x5rz",
      amount: 430,
      status: "processing",
      email: "oliver@example.com",
    },
    {
      id: "y7t6m9sd",
      amount: 725,
      status: "success",
      email: "mason@example.com",
    },
    {
      id: "f2q5x8lc",
      amount: 290,
      status: "failed",
      email: "ava@example.com",
    },
    {
      id: "b1o6z9mp",
      amount: 850,
      status: "success",
      email: "william@example.com",
    },
    {
      id: "w4c2l7tn",
      amount: 310,
      status: "processing",
      email: "mia@example.com",
    },
    {
      id: "s9x8m2pk",
      amount: 465,
      status: "success",
      email: "james@example.com",
    },
    {
      id: "m3y7n5ql",
      amount: 520,
      status: "failed",
      email: "amelia@example.com",
    },
    {
      id: "q6t2x8md",
      amount: 655,
      status: "success",
      email: "benjamin@example.com",
    },
    {
      id: "v9o5l3xn",
      amount: 785,
      status: "processing",
      email: "harper@example.com",
    },
    {
      id: "d4q7m8xp",
      amount: 915,
      status: "success",
      email: "elijah@example.com",
    },
    {
      id: "c8t5x2ml",
      amount: 630,
      status: "failed",
      email: "charlotte@example.com",
    },
    ...Array.from({ length: 30 }, (_, i) => ({
      id: `random${i + 1}`,
      amount: Math.floor(Math.random() * 1000) + 100,
      status: ["success", "processing", "failed"][Math.floor(Math.random() * 3)],
      email: `user${i + 1}@example.com`,
    }))
  ];
  
  

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => console.log("View details", payment.id)}
        >
          <Eye className="mr-2 h-4 w-4" /> Detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("Update", payment.id)}
        >
          <Pencil className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => console.log("Delete", payment.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      )
    },
  },
]

export function DataTableV2() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pageSize, setPageSize] = React.useState(10)

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

  return (
    <div className="w-full px-10">
        <h1 className="mb-2 text-2xl font-bold">Home Page</h1>
        <Button>Create New Data</Button>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
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
                    <TableHead key={header.id}>
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
    {table.getFilteredSelectedRowModel().rows.length} of{" "}
    {table.getFilteredRowModel().rows.length} row(s) selected.
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
