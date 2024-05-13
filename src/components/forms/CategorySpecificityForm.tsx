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
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { AlertDialog } from "../Admin/AlertDialog";

interface Props {
  specificities: CategorySpecificity[];
  onSubmit: () => void;
  onCancel: () => void;
}

export const CategorySpecificityForm = ({
  specificities,
  onSubmit,
  onCancel,
}: Props) => {
  const [search, setSearch] = useState("");
  const [isSortDesc, setIsSortDesc] = useState(false);
  const initialArray = useMemo(() => createCheckboxArray(specificities), []);
  const checkboxArray = useCheckboxArray(initialArray);
  const checkboxArrayRef = useRef(checkboxArray);
  checkboxArrayRef.current = checkboxArray;

  const [isForm, setIsForm] = useState(false);
  const [editedSpecificity, setEditedSpecificity] =
    useState<CategorySpecificity>();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

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

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value.toLowerCase());

  const onDelete = () => {
    checkboxArray.removeMany(checkedElements.map((e) => e.value));
    closeAlert();
  };

  const onSortOrderChange = () => setIsSortDesc((v) => !v);

  const onCreateClick = () => {
    setIsForm(true);
    setEditedSpecificity(undefined);
  };

  const onEditClick = (value: CategorySpecificity) => {
    setIsForm(true);
    setEditedSpecificity(value);
  };

  const closeForm = () => {
    setIsForm(false);
  };

  return (
    <div className="grow flex flex-col gap-6 overflow-y-auto">
      {isForm ? (
        <SpecificityForm
          specificity={editedSpecificity}
          onSubmit={console.log}
          onCancel={closeForm}
        />
      ) : (
        <div className="grow flex flex-col gap-6">
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
                    onClick={openAlert}
                  >
                    Delete
                  </Button>
                ) : (
                  <button onClick={onCreateClick}>
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
                      id={elem.value.id}
                      size="lg"
                      checked={elem.checked}
                      onCheckedChange={(checked) =>
                        checkboxArray.changeChecked(elem, !!checked)
                      }
                    />
                    <label
                      className="text-lg cursor-pointer"
                      htmlFor={elem.value.id}
                    >
                      {elem.value.name}
                    </label>
                  </div>
                  <button onClick={() => onEditClick(elem.value)}>
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
          <div className="mt-auto ml-auto space-x-3.5">
            <Button variant={"secondary"} onClick={onCancel}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
          <AlertDialog
            isOpen={isAlertOpen}
            closeModal={closeAlert}
            onSubmit={onDelete}
            title="Are you sure?"
            text="You will not be able to recover selected specificities after deleting them!"
          />
        </div>
      )}
    </div>
  );
};

const specificityFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  appearance: z.enum(["tiles", "rows"], {
    errorMap: () => ({ message: "You must select appearance" }),
  }),
});

type SpecificityFormValues = z.infer<typeof specificityFormSchema>;

interface SpecificityFormProps {
  specificity?: CategorySpecificity;
  onSubmit: (value: SpecificityFormValues) => void;
  onCancel: () => void;
}

const SpecificityForm = ({
  specificity,
  onSubmit,
  onCancel,
}: SpecificityFormProps) => {
  const isEdit = !!specificity;

  const form = useForm<SpecificityFormValues>({
    resolver: zodResolver(specificityFormSchema),
    defaultValues: isEdit
      ? specificity
      : {
          name: "",
          appearance: "tiles",
        },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow flex flex-col gap-4 px-1"
      >
        <h2 className="text-xl font-semibold">Create category specificity</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <FormLabel className="absolute left-3 -top-0.5 font-light bg-white p-0.5">
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter specificity name" {...field} />
              </FormControl>
              <FormDescription hidden>
                This is specificity display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appearance"
          render={({ field }) => (
            <FormItem className="relative space-y-3.5">
              <FormLabel className="text-xl font-semibold">
                Display appearance
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  className="grid grid-cols-2 gap-3.5"
                  onValueChange={(value) => value && field.onChange(value)}
                  {...field}
                >
                  <ToggleGroupItem className="h-full p-6" value="tiles">
                    <div className="space-y-3.5 text-start">
                      <p className="text-xl space-x-3">
                        <span className="font-normal">Option</span>
                        <span className="font-semibold">Name</span>
                      </p>
                      <div className="flex gap-3">
                        <div className="p-2 rounded-sm">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                        </div>
                        <div className="p-2 rounded-sm">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                        </div>
                        <div className="p-2 ring-1 ring-black rounded-sm">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                        </div>
                        <div className="p-2 rounded-sm">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                        </div>
                        <div className="p-2 rounded-sm">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-full p-6" value="rows">
                    <div className="space-y-3.5 text-start w-[70%]">
                      <p className="text-xl space-x-3">
                        <span className="font-normal">Option</span>
                        <span className="font-semibold">Name</span>
                      </p>
                      <div className="flex flex-col gap-3">
                        <div className="p-2 rounded-sm flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                          <span>Name</span>
                        </div>
                        <div className="p-2 rounded-sm flex items-center gap-2 ring-1 ring-black">
                          <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                          <span>Name</span>
                        </div>
                      </div>
                    </div>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormDescription hidden>Active or inactive</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-auto ml-auto space-x-3.5">
          <Button type="reset" variant={"secondary"} onClick={onCancel}>
            Back
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};
