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
import clsx from "clsx";
import { formatUserRegistrationDate } from "@/lib/date";
import {
  UserRoles,
  deleteUsers,
  getAdminUsers,
  getUsers,
  restoreUser,
  switchUserRole,
  useUser,
} from "@/api/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useModal } from "@/components/Shared/Modal";
import { AlertDialog } from "@/components/Admin/AlertDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { textAvatar } from "@/lib/utils";
import { Pagination } from "@/components/Shared/Pagination";
import { useSearchParamsTools } from "@/lib/router";
import type { User } from "@/api/types";
import { AvatarDefaultFallback } from "@/components/Shared/AvatarDefaultFallback";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  KebabMenuIcon,
  MeatballMenuIcon,
} from "@/components/Shared/Icons";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const pageSize = 10;
const delay = () => new Promise((res) => setTimeout(res, 100));

const roles = ["all", "user", "admin"] as const;

export default function Page() {
  const searchParams = useSearchParamsTools();
  const [selectedRole, setSelectedRole] = useState<UserRoles>(() => {
    const roleFromUrl = searchParams.get?.("role") as UserRoles | undefined;
    return !roleFromUrl || !roles.includes(roleFromUrl) ? "all" : roleFromUrl;
  });
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get?.("searchQuery") ?? ""
  );
  const [page, setPage] = useState(() => {
    const pageFromUrl = searchParams.get?.("page");
    const pageNum = parseInt(pageFromUrl ?? "1");
    return isNaN(pageNum) ? 1 : pageNum;
  });
  const [defferedSearch] = useDebounce(searchQuery, 300);
  const { showModal } = useModal();
  const { user } = useUser();

  const fetchUsers = useCallback(
    () =>
      getAdminUsers({
        role: selectedRole,
        searchQuery: defferedSearch,
        pageIndex: page,
        pageSize,
      }),
    [selectedRole, defferedSearch, page]
  );

  const usersQuery = useQuery({
    queryKey: ["users", selectedRole, defferedSearch, page],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
  });
  const switchRoleMutation = useMutation({
    mutationFn: switchUserRole,
  });
  const deleteUsersMutation = useMutation({
    mutationFn: deleteUsers,
  });
  const restoreUsersMutation = useMutation({
    mutationFn: restoreUser,
  });

  const [dataOptimistic, setDataOptimistic] = useOptimistic(
    usersQuery.data?.data?.filter((u) => u.id !== user?.id)
  );

  const changeSelectedRole = (value: UserRoles) => {
    setSelectedRole(value);
    searchParams.set("role", value);
    changePage(1);
  };
  const changeSearchQuery = (value: string) => {
    setSearchQuery(value);
    searchParams.set("searchQuery", value);
    changePage(1);
  };
  const changePage = (value: number) => {
    setPage(value);
    searchParams.set("page", value.toString());
  };

  const handleMakeCustomer = (id: string) => {
    startTransition(async () => {
      setDataOptimistic((current) =>
        current?.map((v) => (id === v.id ? { ...v, isAdmin: false } : v))
      );
      await switchRoleMutation.mutateAsync({ userId: id });
      await usersQuery.refetch();
    });
  };
  const handleMakeAdmin = (id: string) => {
    startTransition(async () => {
      setDataOptimistic((current) =>
        current?.map((v) => (id === v.id ? { ...v, isAdmin: true } : v))
      );
      await switchRoleMutation.mutateAsync({ userId: id });
      await usersQuery.refetch();
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
          await deleteUsersMutation.mutateAsync({ usersIds: ids });
          await usersQuery.refetch();
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
      await Promise.allSettled([
        ids.map((id) => restoreUsersMutation.mutateAsync({ userId: id })),
      ])
        .then(delay)
        .then(() => usersQuery.refetch());
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
          const fullName = `${user.firstName} ${user.lastName}`;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatarUrl} />
                <AvatarDefaultFallback />
              </Avatar>
              <div>
                <p className="text-base">{fullName}</p>
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
              "capitalize px-3 py-1.5 rounded-sm w-max text-base text-foreground",
              row.original.isDeleted
                ? "bg-destructive-press"
                : "bg-tertiary-press"
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
            {formatUserRegistrationDate(new Date(row.original.createdAt))}
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
                <ArrowUpDownIcon className="h-4 w-4" />
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
                <Button variant="tertiary" className="h-8 w-8 p-0">
                  <span className="sr-only">Open quick actions</span>
                  <KebabMenuIcon className="h-4 w-4" />
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
                <Button variant="tertiary" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MeatballMenuIcon className="h-4 w-4" />
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
            searchQuery={searchQuery}
            onSearchQueryChange={changeSearchQuery}
            selectedRole={selectedRole}
            onSelectRole={changeSelectedRole}
            table={table}
          />
        )}
        empty={
          <div className="flex flex-col justify-center items-center gap-3">
            <Image
              src={"/no-results.webp"}
              alt="No results"
              width={320}
              height={160}
              className="aspect-video object-cover"
            />
            <p>
              {searchQuery.length > 0
                ? "User not found"
                : "No users in the selected role"}
            </p>
          </div>
        }
      />
      {!!usersQuery?.data &&
        (dataOptimistic?.length ?? 0) > 0 &&
        usersQuery.data.count.pagesCount > 1 && (
          <Pagination
            page={page}
            pagesCount={usersQuery.data.count.pagesCount}
            setPage={changePage}
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
            <SelectValue placeholder="Choose role" />
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
              variant="secondary"
              className="ml-auto w-[200px] justify-between"
            >
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
