"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { paymentSchema } from "@/lib/validations";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

interface UpdateOverviewProps {
  setOpen: (open: boolean) => void;
  initialData?: Partial<z.infer<typeof paymentSchema>> | null;
  payment?: Payment | null;
}

export default function UpdateOverviews({ setOpen, initialData, payment }: UpdateOverviewProps) {
  console.log('ini testing payment:', payment);
  
  const safeInitialData = {
    email: payment?.email ?? initialData?.email ?? "",
    amount: payment?.amount ?? initialData?.amount ?? 0,
    status: payment?.status ?? initialData?.status ?? "pending",
  };
  
  const methods = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: safeInitialData,
  });

  const { handleSubmit, register, setValue, formState: { errors } } = methods;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; type: "success" | "failed" | null }>({ open: false, type: null });

  useEffect(() => {
    if (modal.open && modal.type === "success") {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [modal, setOpen]);

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    setLoading(true);
    try {
      console.log("Updating payment with data:", data);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      if (Math.random() > 0.5) {
        throw new Error("Simulated update error");
      }
  
      setModal({ open: true, type: "success" });
    } catch (error) {
      console.error("Update Error:", error);
      setModal({ open: true, type: "failed" });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl w-full mx-auto p-6 border rounded-lg shadow overflow-y-auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input id="email" {...register("email")} placeholder="Masukkan email" type="email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount <span className="text-red-500">*</span></Label>
              <Input id="amount" {...register("amount", { valueAsNumber: true })} placeholder="Masukkan jumlah pembayaran" type="number" />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Status <span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => setValue("status", value as "pending" | "processing" | "success" | "failed")} defaultValue={safeInitialData.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </FormProvider>
      <Dialog open={modal.open} onOpenChange={() => setModal({ open: false, type: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={modal.type === "success" ? "text-green-600" : "text-red-600"}>
              {modal.type === "success" ? "Success!" : "Failed!"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            {modal.type === "success" ? "Your payment has been successfully updated." : "There was an error updating your payment. Please try again."}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
