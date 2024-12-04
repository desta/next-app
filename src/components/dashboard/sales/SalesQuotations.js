"use client"
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination, Chip, Tooltip } from "@nextui-org/react";
import { BiChevronDown, BiEdit, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchQuotations } from "@/redux/slices/quotation/Quotation";
import { capitalize } from "@/utils/Utils";
import Link from "next/link";
import { usePathname } from "next/navigation";



const INITIAL_VISIBLE_COLUMNS = ["customer", "sales", "actions"];

export default function SalesQuotations() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "customer",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const session = useSession()
  const customers = useSelector((state) => state.customers.data);
  const quotations = useSelector((state) => state.quotations.data);

  const ActiveMenuLink = ({ children, href }) => {
    const pathname = usePathname();
    const active = href === pathname;
    return (
      <>
        <Link href={href}>
          {children}
        </Link>
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchQuotations());
  }, []);

  const columns = [
    { uid: "customer", name: "Customer", sortable: true },
    { uid: "sales", name: "Sales", sortable: true },
    { uid: "actions", name: "Actions" },
  ];

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...quotations];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((idx) =>
        idx.customer.perusahaan.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }


    return filteredUsers;
  }, [quotations, filterValue]);

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


  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "customer":
        return (
          <span>{cellValue.perusahaan}</span>
        );
        case "sales":
        return (
          <span>{cellValue.name}</span>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">            
            <Link href={`/dashboard/sales_quotations/QUOT${user.id}?id=${user.id}`}><Chip color="secondary" size="sm">Detail</Chip></Link>
            <Link href={`/dashboard/sales_quotations/edit_quotation/${user.id}?id=${user.id}`}><Tooltip color="warning" content="Edit">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                <BiEdit />
              </span>
            </Tooltip></Link>
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
            placeholder="Cari perusahaan..."
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
            <ActiveMenuLink href={"/dashboard/sales_quotations/tambah_quotation"}><Button color="secondary">Tambah</Button></ActiveMenuLink>
          </div>
        </div>
        <div className="flex justify-between items-center pb-4">
          <span className="text-small">Total {quotations.length} quotations</span>
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
    quotations.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-4 px-2 flex justify-between items-center">
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
          <Button size="sm" color="secondary" onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}>
            Print
          </Button>
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

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Daftar user",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className='p-2 rounded-medium bg-white'>
      <div>
        {topContent}
      </div>
      <div ref={contentToPrint} className="area-print" media="print">
        <Table
          isStriped
          aria-label="Table with custom cells, pagination and sorting"
          isHeaderSticky
          // bottomContent={bottomContent}
          // bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          sortDescriptor={sortDescriptor}
          // topContent={topContent}
          // topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="bg-secondary text-secondary-foreground hover:text-secondary-foreground"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"Tidak ada data quotation."} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {bottomContent}
    </div>
  );
}

