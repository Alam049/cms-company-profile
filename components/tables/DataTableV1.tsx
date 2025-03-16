"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown,Eye, Pencil, Trash2  } from "lucide-react";
import { sampleData } from "@/constants"; 
// import Image from "next/image";

type User = {
  id: string;
  name: string;
  image: string;
  status: string;
};

// Definisi kolom tabel
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
//   {
//     accessorKey: "image",
//     header: "Photo",
//     cell: ({ getValue }) => (
//       <Image
//         src={getValue<string>()} 
//         alt="User" 
//         width={40} 
//         height={40} 
//         className="rounded-full border-2 border-gray-300 shadow-sm"
//       />
//     ),
//   },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return (
        <span className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${status === "active" ? "bg-green-500" : "bg-red-500"}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={() => alert(`Detail ${row.original.id}`)} className="relative group">
        <Eye className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Detail</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => alert(`Update ${row.original.id}`)} className="relative group">
        <Pencil className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Update</span>
      </Button>
      <Button variant="destructive" size="icon" onClick={() => alert(`Delete ${row.original.id}`)} className="relative group">
        <Trash2 className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
      </Button>
    </div>
    ),
  },
];

export default function DataTableV1() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5, // Default 5 item per halaman
  });

  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  const totalPages = Math.ceil(sampleData.length / pagination.pageSize);
  const currentPage = pagination.pageIndex;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= maxVisible + 2) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (currentPage > 1) pages.push(currentPage - 1);
      if (currentPage > 0 && currentPage < totalPages - 1) pages.push(currentPage);
      if (currentPage < totalPages - 2) pages.push(currentPage + 1);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1);
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <span key={index} className="px-2 text-dark200_light900">...</span>
      ) : (
        <Button
          key={index}
          className={`px-3 py-1 text-sm ${
            currentPage === page ? "bg-primary-500 text-white font-bold" : "bg-gray-200 text-dark200_light900"
          }`}
          onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Number(page) }))}
        >
          {Number(page) + 1}
        </Button>
      )
    );
  };

  return (
    <div className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
      {/* Input Pencarian */}
      <Input
        placeholder="Search by keyword..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-72 border-gray-300 focus:ring-primary-500"
      />

      {/* Tabel */}
      <Table className="border border-gray-300 rounded-lg  overflow-hidden">
        <TableHeader className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-gray-300">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="p-3 text-left font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-3 border-b border-gray-200">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center p-4 text-gray-500">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col">
  {/* Pagination Controls Container */}
  <div className="flex justify-between items-center bg-white p-2">
    {/* Items Per Page - Aligned to Left */}
    <div className="flex items-center space-x-2 text-gray-700 text-sm">
      {/* <span>Rows per page:</span> */}
      <Select
        value={pagination.pageSize.toString()}
        onValueChange={(value) => {
          const newSize = value === "all" ? sampleData.length : Number(value);
          setPagination((prev) => ({
            ...prev,
            pageSize: newSize,
            pageIndex: 0, // Reset ke halaman pertama
          }));
        }}
      >
        <SelectTrigger className="w-24 bg-gray-100 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-primary-500">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
   
    <div className="flex gap-4 items-center">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="bg-gray-200 text-dark200_light900 hover:bg-gray-300 "
      >
        Previous
      </Button>
      <div className="flex space-x-2">{renderPageNumbers()}</div>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="bg-gray-200 text-dark200_light900 hover:bg-gray-300"
      >
        Next
      </Button>
    </div>
  </div>
</div>

      

      
    </div>
  );
}
