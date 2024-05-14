import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
  onSubmit: () => void;
}

export const AlertDialog = ({
  isOpen,
  closeModal,
  title,
  text,
  onSubmit,
}: Props) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-6" hideClose>
        <div className="space-y-6">
          <h3 className="text-center text-3xl font-semibold">{title}</h3>
          <Separator />
          <p className="text-lg text-center">{text}</p>
          <div className="pt-2 flex gap-3.5">
            <Button
              variant={"secondary"}
              className="w-full"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={onSubmit}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
