"use client";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  startTransition,
  useCallback,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef, Table } from "@tanstack/react-table";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
import clsx from "clsx";
import { formatUserRegistrationDate } from "@/lib/date";
import { User, UserRoles, getUsers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useModal } from "@/components/Admin/Modal";
import { AlertDialog } from "@/components/Admin/AlertDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { textAvatar } from "@/lib/utils";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const pageSize = 10;
const delay = () => new Promise((res) => setTimeout(res, 1000));

export default function Page() {
  const [selectedRole, setSelectedRole] = useState<UserRoles>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [defferedSearch] = useDebounce(search, 300);
  const { showModal } = useModal();

  const fetchUsers = useCallback(
    () =>
      getUsers({
        role: selectedRole,
        searchQuery: defferedSearch,
        page,
        pageSize,
      }),
    [selectedRole, defferedSearch, page]
  );

  const { data } = useQuery({
    queryKey: ["users", selectedRole, defferedSearch, page],
    queryFn: fetchUsers,
  });
  const [dataOptimistic, setDataOptimistic] = useOptimistic(data?.data);

  const handleMakeCustomer = (id: string) => {
    startTransition(async () => {
      setDataOptimistic((current) =>
        current?.map((v) => (id === v.id ? { ...v, isAdmin: false } : v))
      );
      // TODO: send api request
      await delay();
    });
  };
  const handleMakeAdmin = (id: string) => {
    startTransition(async () => {
      setDataOptimistic((current) =>
        current?.map((v) => (id === v.id ? { ...v, isAdmin: true } : v))
      );
      // TODO: send api request
      await delay();
    });
  };

  const handleDelete = (...ids: string[]) => {
    showModal({
      component: AlertDialog,
      props: {
        title: "Are you sure?",
        text:
          ids.length > 1
            ? "Selected users will be deactivated."
            : "This user will be deactivated.",
      },
    }).then(({ action }) => {
      if (action === "CONFIRM") {
        startTransition(async () => {
          setDataOptimistic((current) =>
            current?.map((v) =>
              ids.includes(v.id) ? { ...v, isDeleted: true } : v
            )
          );
          // TODO: send api request
          await delay();
        });
      }
    });
  };
  const handleRestore = (...ids: string[]) => {
    startTransition(async () => {
      setDataOptimistic((current) =>
        current?.map((v) =>
          ids.includes(v.id) ? { ...v, isDeleted: false } : v
        )
      );
      // TODO: send api request
      await delay();
    });
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="h-full flex items-center">
            <Checkbox
              size="lg"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <Checkbox
            size="lg"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        header: "User",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={placeholder} />
                <AvatarFallback>{textAvatar(user.fullName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base">{user.fullName}</p>
                <p className="text-sm">
                  {user.isAdmin ? "Administrator" : "Customer"}
                </p>
              </div>
            </div>
          );
        },
        enableHiding: false,
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => (
          <div
            className={clsx(
              "capitalize px-3 py-2 rounded-lg w-max",
              row.original.isDeleted
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {row.original.isDeleted ? "Deleted" : "Active"}
          </div>
        ),
      },
      {
        id: "registration date",
        header: "Registration date",
        cell: ({ row }) => (
          <div className="text-base">
            {formatUserRegistrationDate(new Date(row.original.registerAt))}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-3">
              Email
              <button
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase text-base">{row.getValue("email")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        header: ({ table }) => {
          const showMore =
            table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

          const onDelete = () =>
            handleDelete(
              ...table
                .getSelectedRowModel()
                .rows.filter((row) => !row.original.isDeleted)
                .map((row) => row.original.id)
            );
          const onRestore = () =>
            handleRestore(
              ...table
                .getSelectedRowModel()
                .rows.filter((row) => row.original.isDeleted)
                .map((row) => row.original.id)
            );

          return showMore ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open quick actions</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-4 w-60">
                <DropdownMenuItem className="px-4 py-2.5" onClick={onRestore}>
                  Restore
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-4 py-2.5 text-destructive"
                  onClick={onDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null;
        },
        cell: ({ row }) => {
          const user = row.original;

          const onMakeCustomer = () => handleMakeCustomer(user.id);
          const onMakeAdmin = () => handleMakeAdmin(user.id);
          const onDelete = () => handleDelete(user.id);
          const onRestore = () => handleRestore(user.id);

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-4 w-72">
                <DropdownMenuItem
                  className="p-4 px-4 py-2.5"
                  onClick={user.isAdmin ? onMakeCustomer : onMakeAdmin}
                >
                  {user.isAdmin ? "Make customer" : "Make administrator"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={clsx(
                    "p-4 px-4 py-2.5",
                    !user.isDeleted && "text-destructive"
                  )}
                  onClick={user.isDeleted ? onRestore : onDelete}
                >
                  {user.isDeleted ? "Restore" : "Delete"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4 px-4 py-2.5">
                  View orders
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 px-4 py-2.5">
                  View reviews
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="grow flex flex-col gap-4 lg:gap-6">
      <DataTable
        data={dataOptimistic ?? []}
        columns={columns}
        header={(table) => (
          <TableHeader
            searchQuery={search}
            onSearchQueryChange={setSearch}
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
            table={table}
          />
        )}
        empty={
          <div className="flex flex-col justify-center items-center gap-3">
            <Image
              src={placeholder}
              alt="not found"
              className="max-w-xs aspect-video object-cover"
            />
            <p>
              {search.length > 0
                ? "User not found"
                : "No users in the selected role"}
            </p>
          </div>
        }
      />
      {!!data && data.data.length > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          pagesCount={data.count.pageCount}
          setPage={setPage}
        />
      )}
    </div>
  );
}

const TableHeader = ({
  table,
  searchQuery,
  onSearchQueryChange,
  selectedRole,
  onSelectRole,
}: {
  table: Table<User>;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedRole: UserRoles;
  onSelectRole: (role: UserRoles) => void;
}) => {
  return (
    <div className="flex gap-4 h-10 w-full">
      <div className="flex items-center gap-3 basis-1/4">
        <h2 className="font-medium">Role</h2>
        <Select
          value={selectedRole}
          onValueChange={(v) => onSelectRole(v as UserRoles)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={"all"}
              className="p-4"
              checkAlign="right"
              checkOffset={4}
            >
              <p>All</p>
            </SelectItem>
            <SelectItem
              value={"admin"}
              className="p-4"
              checkAlign="right"
              checkOffset={4}
            >
              <p>Administrator</p>
            </SelectItem>
            <SelectItem
              value={"user"}
              className="p-4"
              checkAlign="right"
              checkOffset={4}
            >
              <p>Customer</p>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4 basis-3/4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto w-[200px] justify-between"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-4 w-72">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize p-4 cursor-pointer [&>span]:left-auto [&>span]:right-4 data-[state=checked]:bg-accent"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const Pagination = ({
  page,
  pagesCount,
  pageSize,
  setPage,
}: {
  page: number;
  pagesCount: number;
  pageSize: number;
  setPage: (value: number) => void;
}) => {
  const pages = Math.ceil(pagesCount / pageSize);
  const hasPrev = page > 1;
  const hasNext = page < pagesCount;

  const onPrev = () => setPage(page - 1);
  const onNext = () => setPage(page + 1);

  return (
    <div className="flex justify-center items-center gap-3">
      <Button variant={"ghost"} disabled={!hasPrev} onClick={onPrev}>
        <ChevronLeft className="w-6 h-6" />
      </Button>
      {Array.from({
        length: pages,
      }).map((_, i) => {
        const pageNumber = i + 1;
        return (
          <Button
            variant={pageNumber === page ? "default" : "secondary"}
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button variant={"ghost"} disabled={!hasNext} onClick={onNext}>
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};
