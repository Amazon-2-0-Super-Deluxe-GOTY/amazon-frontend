import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { createCheckboxArray, useCheckboxArray } from "@/lib/checkboxArray";
import { ArrowUpDownIcon, FilePenLineIcon, PlusIcon } from "lucide-react";
import type { CategorySpecificity } from "../Admin/Category/types";

interface Props {
  specificities: CategorySpecificity[];
  onSubmit: () => void;
  onCancel: () => void;
}

interface SpecificsCheckboxArrayApi {
  getSpecificities: () => CategorySpecificity[];
}

const createFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  appearance: z.enum(["tiles", "rows"]),
  type: z.enum(["color", "text"]),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

export const CategorySpecificityForm = ({
  specificities,
  onSubmit,
  onCancel,
}: Props) => {
  const [api, setApi] = useState<SpecificsCheckboxArrayApi>();

  return (
    <div className="grow flex flex-col gap-6">
      <SpecificsCheckboxArray specificities={specificities} setApi={setApi} />
      <div className="mt-auto ml-auto space-x-3.5">
        <Button variant={"secondary"} onClick={onCancel}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

interface SpecificsCheckboxArrayProps {
  specificities: CategorySpecificity[];
  setApi: (api: SpecificsCheckboxArrayApi) => void;
}

const SpecificsCheckboxArray = ({
  specificities,
  setApi,
}: SpecificsCheckboxArrayProps) => {
  const [search, setSearch] = useState("");
  const [isSortDesc, setIsSortDesc] = useState(false);
  const initialArray = useMemo(() => createCheckboxArray(specificities), []);
  const checkboxArray = useCheckboxArray(initialArray);
  const checkboxArrayRef = useRef(checkboxArray);
  checkboxArrayRef.current = checkboxArray;

  const filteredElements = useMemo(
    () =>
      search
        ? checkboxArray.array
            .filter((elem) => elem.value.name.toLowerCase().includes(search))
            .sort((a, b) =>
              isSortDesc
                ? -a.value.name.localeCompare(b.value.name)
                : a.value.name.localeCompare(b.value.name)
            )
        : [...checkboxArray.array].sort((a, b) =>
            isSortDesc
              ? -a.value.name.localeCompare(b.value.name)
              : a.value.name.localeCompare(b.value.name)
          ),
    [checkboxArray.array, search, isSortDesc]
  );
  const checkedElements = useMemo(
    () => filteredElements.filter((e) => e.checked),
    [filteredElements]
  );

  useEffect(() => {
    setApi({
      getSpecificities() {
        return checkboxArrayRef.current.array.map((e) => e.value);
      },
    });
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value.toLowerCase());

  const onDelete = () =>
    checkboxArray.removeMany(checkedElements.map((e) => e.value));

  const onSortOrderChange = () => setIsSortDesc((v) => !v);

  return (
    <div className="space-y-6">
      <div className="space-y-3.5">
        <Input
          type="text"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={onSearchChange}
        />
        <div className="space-y-4">
          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Checkbox
                size="lg"
                checked={checkboxArray.isAllChecked}
                onCheckedChange={(checked) =>
                  checkboxArray.changeAllChecked(!!checked)
                }
              />
              <p className="text-lg">Name</p>
              <button onClick={onSortOrderChange}>
                <ArrowUpDownIcon className="w-6 h-6" />
              </button>
            </div>
            {!!checkedElements?.length ? (
              <Button
                variant={"link"}
                className="py-0 h-max text-lg text-red-600"
                onClick={onDelete}
              >
                Delete
              </Button>
            ) : (
              <button>
                <PlusIcon className="w-6 h-6" />
              </button>
            )}
          </div>
          <Separator />
        </div>
      </div>
      <div className="space-y-4 h-[25vh] overflow-y-auto relative">
        {filteredElements.length > 0 ? (
          filteredElements.map((elem) => (
            <div
              className="flex justify-between items-center"
              key={elem.value.id}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  size="lg"
                  checked={elem.checked}
                  onCheckedChange={(checked) =>
                    checkboxArray.changeChecked(elem, !!checked)
                  }
                />
                <p className="text-lg">{elem.value.name}</p>
              </div>
              <button>
                <FilePenLineIcon className="w-6 h-6" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
            There are no specifics in this category
          </p>
        )}
      </div>
    </div>
  );
};
