"use client"
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchComponents } from "@/redux/slices/website/Components";
import { capitalize } from "@/components/Utils";
import Edit from "./Edit";
import Hapus from "./Hapus";
import AddComponent from "./AddComponent";

const INITIAL_VISIBLE_COLUMNS = ["title", "page", "region", "actions"];
const INITIAL_VISIBLE_COLUMNS_PAGE = ["title", "region", "addComponent"];
const whoList = {addCompPage: 'addCompPage', compPage: 'compPage'}

export default function TabelComponent({who, incommingData}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(who === whoList.addCompPage ? INITIAL_VISIBLE_COLUMNS_PAGE : INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "region",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const componnetsToDisplay = ()=>{
    const reduxComponents = useSelector((state) => state.components.data);
    const incomingCompIdList = incommingData?.map((item) => item.id);
    if (who === whoList.compPage){
      return incommingData
    } else if(who === whoList.addCompPage){
      return reduxComponents.filter((item) => {
        return !incomingCompIdList.includes(item.id);
        })
    }else{
      return reduxComponents
    }
  }
  let components = componnetsToDisplay();


  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  // const columns = who === whoList.addCompPage ? [
  //   { uid: "title", name: "Title", sortable: true },
  //   { uid: "page", name: "Page", sortable: true },
  //   { uid: "region", name: "Region", sortable: true },
  //   { uid: "urutan", name: "Urutan", sortable: true },
  //   { uid: "addComponent", name: "Add component" },
  // ] : [
  //   { uid: "title", name: "Title", sortable: true },
  //   { uid: "region", name: "Region", sortable: true },
  //   { uid: "urutan", name: "Urutan", sortable: true },
  //   { uid: "actions", name: "Actions" },
  // ]; 

  const columns = [
    { uid: "title", name: "Title", sortable: true },
    { uid: "page", name: "Page", sortable: true },
    { uid: "region", name: "Region", sortable: true },
    { uid: "urutan", name: "Urutan", sortable: true },
    { uid: "actions", name: "Actions" },
];

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...components];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((idx) =>
        idx.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredUsers;
  }, [components, filterValue]);

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

  const renderCell = React.useCallback((idx, columnKey) => {
    const cellValue = idx[columnKey];

    switch (columnKey) {
      case "region":
        return (
          <span>{idx.region}</span>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Edit params={idx} />
            <Hapus params={idx} />
          </div>
        );
        case "addComponent":
          return (
            <Button>add</Button>
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
            placeholder="Cari component..."
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
            <AddComponent />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-small">Total {components.length} components</span>
          <label className="flex items-center text-small">
            Tampilan per halaman:
            <select
              className="bg-transparent outline-none text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">20</option>
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
    components.length,
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
      bottomContent={who !== whoList.addCompPage && bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      topContent={who !== whoList.addCompPage && topContent}
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
      <TableBody emptyContent={"Tidak ada data component."} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

