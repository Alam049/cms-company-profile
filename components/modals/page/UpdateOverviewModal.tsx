import UpdateOverviews from "@/app/(root)/product/overview/[id]/update/page";
import CustomModal from "@/components/modals/CustomModal";


interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

interface UpdatePaymentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  payment?: Payment | null; // Tambahkan payment sebagai opsional
}

export default function UpdatePaymentModal({ open, setOpen, payment }: UpdatePaymentModalProps) {
  return (
    <CustomModal title="Update Payment" open={open} setOpen={setOpen}>
      <div>
        <UpdateOverviews setOpen={setOpen} payment={payment} />
      </div>
    </CustomModal>
  );
}

