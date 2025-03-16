import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CustomModalProps {
  title: string;
  triggerLabel?: string;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  maxWidth?:string;
}

export default function CustomModal({ title, triggerLabel, children, open, setOpen, maxWidth }: CustomModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
        </DialogTrigger>
      )}
      <DialogContent  className={`${maxWidth} !w-full border  p-6 rounded-lg`}>
        <DialogHeader >
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader >
        <div className="space-y-4">
        {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
