"use client";
import CreatePaymentModal from "@/components/modals/page/CreateOverviewModal";
import UpdatePaymentModal from "@/components/modals/page/UpdateOverviewModal";
import { DataTableV2Testing } from "@/components/tables/DataTableV2Testing";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

export default function PaymentDetail() {
  const searchParams = useSearchParams();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const handleOpenUpdateModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpenUpdate(true);
  };

   const columns: ColumnDef<Payment>[] = [
      {
        id: "index",
        header: "No",
        cell: ({ row }) => <div className="p-2">{row.index + 1}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div className="capitalize p-2">{row.getValue("status")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            className="p-2"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => <div className="lowercase p-2">{row.getValue("email")}</div>,
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-left p-2">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
          return <div className="text-left p-2 font-medium">{formatted}</div>;
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original;
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
                <Link href={`/product/overview/${payment.id}?status=${encodeURIComponent(payment.status)}&amount=${payment.amount}&email=${payment.email}`} passHref>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" /> Detail
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleOpenUpdateModal(payment)}>
                  <Pencil className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={() => console.log("Delete", payment.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  
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
    ];

  const payment: Payment = {
    id: "m5gr84i9",
    email: searchParams.get("email") || "-",
    amount: searchParams.get("amount") ? Number(searchParams.get("amount")) : 0,
    status: (searchParams.get("status") as "pending" | "processing" | "success" | "failed") || "pending",
  };

  return (
    <>
    
  
    <div className="max-w-4xl w-full flex flex-col ml-10 p-6 border rounded-lg shadow overflow-y-auto bg-white dark:bg-black border-gray-300 dark:border-gray-700 transition-colors duration-300">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label className="text-black dark:text-white">Email</Label>
            <div className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-black transition-colors duration-300">{payment.email}</div>
          </div>
          <div className="space-y-2">
            <Label className="text-black dark:text-white">Amount</Label>
            <div className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-black transition-colors duration-300">{payment.amount}</div>
          </div>
          <div className="space-y-2">
            <Label className="text-black dark:text-white">Status</Label>
            <div className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-black capitalize transition-colors duration-300">{payment.status}</div>
          </div>
        </div>
      </div>
       
    </div>
   <div className="mt-10">
   <DataTableV2Testing
    data={data}
    columns={columns}
    title='Payment List'
    label='Create Payment'
    onClickCreate={() => setIsModalOpen(true)}
  />
  <CreatePaymentModal open={isModalOpen} setOpen={setIsModalOpen} />
  <UpdatePaymentModal open={isModalOpenUpdate} setOpen={setIsModalOpenUpdate} payment={selectedPayment} />
   </div>
  </>
  )
}
