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
import { ArrowUpDownIcon } from "lucide-react";

interface Props {
  keywords: string[];
  onSubmit: (keywords: string[]) => void;
  onCancel: () => void;
}

interface KeywordsCheckboxArrayApi {
  isKeywordExist: (keyword: string) => boolean;
  appendKeyword: (value: string) => void;
  getKeywords: () => string[];
}

const createFormSchema = z.object({
  keyword: z.string().min(1, {
    message: "Keyword must be at least 1 character.",
  }),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

export const CategoryKeywordsForm = ({
  keywords,
  onSubmit,
  onCancel,
}: Props) => {
  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const [api, setApi] = useState<KeywordsCheckboxArrayApi>();

  const onCreateKeyword = (values: CreateFormValues) => {
    if (api?.isKeywordExist(values.keyword)) {
      return createForm.setError("keyword", {
        type: "exist",
        message: `The keyword '${values.keyword}' already exist`,
      });
    }

    api?.appendKeyword(values.keyword);
    createForm.reset();
  };

  const onSave = () => {
    const keywords = api?.getKeywords();
    if (keywords) {
      onSubmit(keywords);
    }
  };

  return (
    <div className="grow flex flex-col gap-6">
      <Form {...createForm}>
        <form
          className="flex items-center"
          onSubmit={createForm.handleSubmit(onCreateKeyword)}
        >
          <FormField
            control={createForm.control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="w-full space-y-0 relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Keyword
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-e-none"
                    placeholder="Enter keyword or key phrase"
                    {...field}
                  />
                </FormControl>
                <FormDescription hidden>
                  This is category public display name.
                </FormDescription>
                <FormMessage className="absolute left-0 -bottom-5" />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-s-none">
            Create
          </Button>
        </form>
      </Form>
      <Separator />
      <KeywordsCheckboxArray keywords={keywords} setApi={setApi} />
      <div className="mt-auto ml-auto space-x-3.5">
        <Button variant={"secondary"} onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

interface KeywordsCheckboxArrayProps {
  keywords: string[];
  setApi: (api: KeywordsCheckboxArrayApi) => void;
}

const KeywordsCheckboxArray = ({
  keywords,
  setApi,
}: KeywordsCheckboxArrayProps) => {
  const [search, setSearch] = useState("");
  const [isSortDesc, setIsSortDesc] = useState(false);
  const initialArray = useMemo(() => createCheckboxArray(keywords), []);
  const checkboxArray = useCheckboxArray(initialArray);
  const checkboxArrayRef = useRef(checkboxArray);
  checkboxArrayRef.current = checkboxArray;

  const filteredElements = useMemo(
    () =>
      search
        ? checkboxArray.array
            .filter((elem) => elem.value.toLowerCase().includes(search))
            .sort((a, b) =>
              isSortDesc
                ? -a.value.localeCompare(b.value)
                : a.value.localeCompare(b.value)
            )
        : [...checkboxArray.array].sort((a, b) =>
            isSortDesc
              ? -a.value.localeCompare(b.value)
              : a.value.localeCompare(b.value)
          ),
    [checkboxArray.array, search, isSortDesc]
  );
  const checkedElements = useMemo(
    () => filteredElements.filter((e) => e.checked),
    [filteredElements]
  );

  useEffect(() => {
    setApi({
      appendKeyword(value) {
        checkboxArray.append(value);
      },
      isKeywordExist(keyword) {
        return checkboxArrayRef.current.array.some(
          (elem) => elem.value === keyword
        );
      },
      getKeywords() {
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
            {!!checkedElements?.length && (
              <Button
                variant={"link"}
                className="py-0 h-max text-lg text-red-600"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
          </div>
          <Separator />
        </div>
      </div>
      <div className="space-y-4 h-[300px] overflow-y-auto relative">
        {filteredElements.length > 0 ? (
          filteredElements.map((elem) => (
            <div className="flex items-center gap-4" key={elem.value}>
              <Checkbox
                size="lg"
                checked={elem.checked}
                onCheckedChange={(checked) =>
                  checkboxArray.changeChecked(elem, !!checked)
                }
              />
              <p className="text-lg">{elem.value}</p>
            </div>
          ))
        ) : (
          <p className="text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
            There are no keywords in this category
          </p>
        )}
      </div>
    </div>
  );
};
