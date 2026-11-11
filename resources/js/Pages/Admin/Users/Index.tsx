import { useEffect, useRef, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Search, Users as UsersIcon, X } from 'lucide-react';

import { AppSidebar } from '@/Components/app-sidebar';
import { SiteHeader } from '@/Components/site-header';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Input } from '@/Components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/Components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import {
  SidebarInset,
  SidebarProvider,
} from '@/Components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

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
  const isInitialMount = useRef(true);

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
        preserveScroll: true,
        replace: true,
      },
    );
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      applyFilters(search, role);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleClearSearch = () => {
    setSearch('');
    applyFilters('', role);
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    applyFilters(search, newRole);
  };

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
        preserveScroll: true,
      },
    );
  };

  const getPageNumbers = () => {
    const currentPage = users.current_page;
    const lastPage = users.last_page;

    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', lastPage];
    }

    if (currentPage >= lastPage - 2) {
      return [1, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      lastPage,
    ];
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'User Info',
      cell: ({ row }) => {
        const initials =
          row.original.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'U';

        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {row.original.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {row.original.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const userRole = row.original.role;
        return (
          <Badge
            variant={userRole === 'admin' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {userRole}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'urls_count',
      header: 'Total Links',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.original.urls_count.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: () => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Open actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                View
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title="Users" />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              {/* PAGE HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Users
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Manage registered users and monitor system access.
                  </p>
                </div>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name or email..."
                      className="h-9 pl-8 pr-8 text-xs"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        title="Clear search"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>

                  <Select value={role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="h-9! w-full sm:w-40 text-xs">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-2.5 py-1 font-medium">
                    {users.total} {users.total === 1 ? 'user' : 'users'} total
                  </span>
                </div>
              </div>

              {/* TABLE WITH CARD WRAPPER */}
              <Card className="overflow-hidden p-0">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="h-10 text-xs font-semibold text-muted-foreground"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>

                    <TableBody>
                      {hasRows ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            className="transition-colors hover:bg-muted/40"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="py-3">
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
                            className="h-64 text-center"
                          >
                            <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
                              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                <UsersIcon className="size-6 text-muted-foreground" />
                              </div>
                              <p className="text-sm font-semibold text-foreground">
                                No users found
                              </p>
                              <p className="max-w-sm text-xs text-muted-foreground">
                                We couldn't find any users matching your search or role filter.
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>

                {/* PAGINATION FOOTER */}
                <CardFooter className="flex flex-col gap-4 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{users.from ?? 0}</span> to{' '}
                    <span className="font-medium text-foreground">{users.to ?? 0}</span> of{' '}
                    <span className="font-medium text-foreground">{users.total}</span> users
                  </p>

                  {users.last_page > 1 && (
                    <Pagination className="mx-0 w-auto justify-end">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (users.current_page > 1) {
                                goToPage(users.current_page - 1);
                              }
                            }}
                            className={
                              users.current_page === 1
                                ? 'pointer-events-none opacity-50'
                                : ''
                            }
                          />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={`${page}-${index}`}>
                            {page === '...' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                isActive={page === users.current_page}
                                onClick={(e) => {
                                  e.preventDefault();
                                  goToPage(page as number);
                                }}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (users.current_page < users.last_page) {
                                goToPage(users.current_page + 1);
                              }
                            }}
                            className={
                              users.current_page === users.last_page
                                ? 'pointer-events-none opacity-50'
                                : ''
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </CardFooter>
              </Card>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
