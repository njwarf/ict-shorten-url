import { AppSidebar } from '@/Components/app-sidebar';
import { SiteHeader } from '@/Components/site-header';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
  SidebarInset,
  SidebarProvider,
} from '@/Components/ui/sidebar';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/Components/ui/pagination';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  urls_count: number;
  created_at: string;
};

type UsersData = {
  data: User[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number | null;
  to: number | null;
};

type PageProps = {
  users: UsersData;
  filters: {
    search?: string;
    role?: string;
  };
};

export default function Index() {
  const { users, filters } = usePage<PageProps>().props;

  const [search, setSearch] = useState(filters.search ?? '');
  const [role, setRole] = useState(filters.role ?? 'all');

  const applyFilters = (newSearch: string, newRole: string) => {
    router.get(
      '/admin/users',
      {
        search: newSearch || undefined,
        role: newRole !== 'all' ? newRole : undefined,
        page: 1,
      },
      {
        preserveState: true,
        replace: true,
      },
    );
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    applyFilters(value, role);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    applyFilters(search, value);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'User Info',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.name}
          </div>

          <div className="text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },

    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <span className="rounded-full border px-2 py-1 text-xs font-medium">
          {row.original.role}
        </span>
      ),
    },

    {
      accessorKey: 'urls_count',
      header: 'Total Links',
    },

    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleDateString('id-ID'),
    },

    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-md p-2 hover:bg-muted"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              View
            </DropdownMenuItem>

            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: users.data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    pageCount: users.last_page,

    state: {
      pagination: {
        pageIndex: users.current_page - 1,
        pageSize: users.per_page ?? 10,
      },
    },
  });

  const goToPage = (page: number) => {
    router.get(
      '/admin/users',
      {
        search: search || undefined,
        role: role !== 'all' ? role : undefined,
        page,
      },
      {
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Users" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              <div className="space-y-6">

                {/* Header */}
                <div>
                  <h1 className="text-2xl font-semibold">
                    Users
                  </h1>

                  <p className="text-muted-foreground">
                    Manage registered users.
                  </p>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search name or email..."
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
                  />

                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-40"
                  >
                    <option value="all">
                      All Roles
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                    <option value="user">
                      User
                    </option>
                  </select>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>

                    <TableBody>
                      {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No users found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted-foreground">
                    {users.total > 0
                      ? `Showing ${users.from} to ${users.to} of ${users.total} users`
                      : 'Showing 0 users'}
                  </div>

                  {users.last_page > 1 && (
                    <Pagination>
                      <PaginationContent>

                        <PaginationItem>
                          <PaginationPrevious
                            href={
                              users.current_page > 1
                                ? `?page=${users.current_page - 1}`
                                : undefined
                            }
                            onClick={(e) => {
                              e.preventDefault();

                              if (users.current_page > 1) {
                                goToPage(users.current_page - 1);
                              }
                            }}
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: users.last_page },
                          (_, index) => {
                            const page = index + 1;

                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href={`?page=${page}`}
                                  isActive={
                                    page === users.current_page
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(page);
                                  }}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          },
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href={
                              users.current_page < users.last_page
                                ? `?page=${users.current_page + 1}`
                                : undefined
                            }
                            onClick={(e) => {
                              e.preventDefault();

                              if (
                                users.current_page < users.last_page
                              ) {
                                goToPage(users.current_page + 1);
                              }
                            }}
                          />
                        </PaginationItem>

                      </PaginationContent>
                    </Pagination>
                  )}
                </div>

              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
