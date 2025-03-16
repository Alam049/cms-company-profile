import CreateOverview from "@/app/(root)/product/overview/create/page";
import CustomModal from "@/components/modals/CustomModal";

interface CreatePaymentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreatePaymentModal({ open, setOpen }: CreatePaymentModalProps) {
  return (
    <CustomModal title="Create Payment" open={open} setOpen={setOpen}>
      <div >
      <CreateOverview setOpen={setOpen} />
      </div>
    </CustomModal>
  );
}
