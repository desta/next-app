"use client"
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination, Chip } from "@nextui-org/react";
import { capitalize } from "../../../utils/Utils";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Tambah from "./Tambah";
import Link from "next/link";
import { fetchTickets } from "@/redux/slices/tickets";
// import { fetchTicketUser } from "@/redux/slices/TicketUser";
import { useSession } from "next-auth/react";

const INITIAL_VISIBLE_COLUMNS = ["judul", "tanggal", "category", "status", "actions"];

export default function TabelTicket() {
    var tgl = { year: 'numeric', month: 'short', day: 'numeric' };
    var jam = { hour: 'numeric', minute: 'numeric' };
    const session = useSession();
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "judul",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    let tickets;
    if(session.data?.user.akses === "User"){
        tickets = useSelector((state) => state.tickets.data.filter((item) => item.userId === session.data?.user.id));
    }else{
        tickets = useSelector((state) => state.tickets.data);
    }

    useEffect(() => {
        dispatch(fetchTickets())
    }, []);

    const statusColor = {
        Open: "success",
        Closed: "default",
    };

    const columns = [
        { uid: "judul", name: "Judul", sortable: true },
        { uid: "tanggal", name: "Tanggal" },
        { uid: "category", name: "Category" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" },
    ];

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredTicket = [...tickets];

        if (hasSearchFilter) {
            filteredTicket = filteredTicket.filter((ticket) =>
                ticket.judul.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }


        return filteredTicket;
    }, [tickets, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((ticket, columnKey) => {
        const cellValue = ticket[columnKey];

        switch (columnKey) {
            case "tanggal":
                return (
                    <span>{new Date(cellValue).toLocaleDateString("id-ID", tgl)}, {new Date(cellValue).toLocaleTimeString("id-ID", jam).replace('.', ':')}</span>
                );
            case "status":
                return (
                    <Chip color={statusColor[ticket.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Link href={`/dashboard/ticket/${ticket.judul}?id=${ticket.id}`}><Chip color="secondary" size="sm">Lihat</Chip></Link>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Cari judul ticket..."
                        startContent={<BiSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                        color="secondary"
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<BiChevronDown className="text-small" />} variant="flat" color="secondary">
                                    Kolom
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Tambah />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-small">Total {tickets.length} tickets</span>
                    <label className="flex items-center text-small">
                        Tampilan per halaman:
                        <select
                            className="bg-transparent outline-none text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onRowsPerPageChange,
        tickets.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" color="secondary" onPress={onPreviousPage}>
                        Kembali
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" color="secondary" onPress={onNextPage}>
                        Lanjut
                    </Button>
                </div>
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            isStriped
            aria-label="Table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]"
            }}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                        className="bg-secondary text-secondary-foreground"
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"Tidak ada data ticket"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

