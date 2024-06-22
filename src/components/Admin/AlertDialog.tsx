import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

interface Props {
  title: string;
  text: string;
  buttonConfirmText?: string;
  buttonCloseText?: string;
  colorVariant?: "primary" | "destructive";
  closeModal: (param?: { action: "CLOSE" } | { action: "CONFIRM" }) => void;
}

export const AlertDialog = ({
  closeModal,
  title,
  text,
  buttonConfirmText = "Delete",
  buttonCloseText = "Cancel",
  colorVariant = "destructive",
}: Props) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  const firstBtnVariant =
    colorVariant === "destructive" ? "primary" : "secondary";
  const secondBtnVariant =
    colorVariant === "destructive" ? "destructive" : "primary";

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-6" hideClose>
        <div className="space-y-5 lg:space-y-6">
          <div className="space-y-3.5 lg:space-y-6">
            <h3 className="text-center text-xl lg:text-3xl font-semibold">
              {title}
            </h3>
            <Separator />
          </div>
          <p className="text-base lg:text-lg text-center">{text}</p>
          <div className="pt-2 flex gap-3.5">
            <Button
              variant={firstBtnVariant}
              className="w-full"
              onClick={() => closeModal({ action: "CLOSE" })}
            >
              {buttonCloseText}
            </Button>
            <Button
              variant={secondBtnVariant}
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
