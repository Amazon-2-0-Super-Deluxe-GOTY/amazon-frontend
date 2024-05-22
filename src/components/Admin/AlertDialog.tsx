import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

interface Props {
  title: string;
  text: string;
  buttonConfirmText?: string;
  buttonCloseText?: string;
  variant?: "default" | "destructive";
  closeModal: (param?: { action: "CLOSE" } | { action: "CONFIRM" }) => void;
}

export const AlertDialog = ({
  closeModal,
  title,
  text,
  buttonConfirmText = "Delete",
  buttonCloseText = "Cancel",
  variant = "destructive",
}: Props) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-6" hideClose>
        <div className="space-y-6">
          <h3 className="text-center text-3xl font-semibold">{title}</h3>
          <Separator />
          <p className="text-lg text-center">{text}</p>
          <div className="pt-2 flex gap-3.5">
            <Button
              variant={"secondary"}
              className="w-full"
              onClick={() => closeModal({ action: "CLOSE" })}
            >
              {buttonCloseText}
            </Button>
            <Button
              variant={variant}
              className="w-full"
              onClick={() => closeModal({ action: "CONFIRM" })}
            >
              {buttonConfirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
