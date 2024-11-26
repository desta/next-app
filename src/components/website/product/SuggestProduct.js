'use client'
import { addCurrentSelectionProduct, removeCurrentSelectionProduct, removeSelectedProduct, setCurrentSelectionProduct, setSelectedProduct } from "@/redux/slices/media_aplication/MediaAplication";
import { fetchProducts } from "@/redux/slices/product/Products";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Pagination, getKeyValue } from "@nextui-org/react";
import React, { useEffect } from "react";
import { BiSearch, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const columns = [
    { name: "Title", uid: "title", sortable: true },
];
const columnsSelected = [
    { name: "Title", uid: "title" },
    { name: "Action", uid: "actions" },
];
export default function SuggestProduct({ what, dataProduct }) {
    const dispatch = useDispatch()
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "title",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const products = useSelector((state) => state.products.data);
    const selectedProduct = useSelector((state) => state.products.selectedProduct);
    const currentSelection = useSelector((state) => state.products.currentSelection);

    const getData = () => {
        dispatch(fetchProducts());
    }

    const handleSelect = (product) => {
        if (!currentSelection.includes(product)) {
            dispatch(addCurrentSelectionProduct(product))
        } else if (currentSelection.includes(product)) {
            dispatch(removeCurrentSelectionProduct(product.id))
        }
    }

    const removeSelected = (id) => {
        dispatch(removeSelectedProduct(id))
    }

    const addImageFunc = (runFunc) => {
        dispatch(setSelectedProduct(currentSelection));
        dispatch(setCurrentSelectionProduct([]));
        runFunc()
    }
    const getStates = () => {
        if (what === 'edit') {
            dispatch(setSelectedProduct(dataProduct))
        } else {
            dispatch(setSelectedProduct([]))
        }
    }
    useEffect(() => {
        getData();
        getStates();
    }, [])

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredproducts = [...products];

        if (hasSearchFilter) {
            filteredproducts = filteredproducts.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredproducts;
    }, [products, filterValue]);

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
            case "actions":
                return (
                    <div className="relative flex items-center">
                        <Tooltip color="danger" content="Delete">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <BiTrash />
                            </span>
                        </Tooltip>
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
                        placeholder="Search by name..."
                        startContent={<BiSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {products.length} products</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        onRowsPerPageChange,
        products.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
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
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" color="secondary" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className='p-2 rounded-medium border-medium border-default-200'>
                {/* <Table aria-label="Selected table">
                    <TableHeader columns={columnsSelected}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={selectedProduct}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table> */}
                <Button onPress={onOpen} color="secondary" size="sm">Add Suggest product</Button>

            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='center' scrollBehavior='outside' isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Suggest Product</ModalHeader>
                            <ModalBody>
                                <Table
                                    aria-label="Example table with custom cells, pagination and sorting"
                                    isHeaderSticky
                                    bottomContent={bottomContent}
                                    bottomContentPlacement="outside"
                                    classNames={{
                                        wrapper: "max-h-[382px]",
                                    }}
                                    selectedKeys={selectedKeys}
                                    selectionMode="multiple"
                                    sortDescriptor={sortDescriptor}
                                    topContent={topContent}
                                    topContentPlacement="outside"
                                    onSelectionChange={setSelectedKeys}
                                    onSortChange={setSortDescriptor}
                                    color="secondary"
                                >
                                    <TableHeader className="bg-secondary">
                                        {columns.map((column) =>
                                            <TableColumn key={column.uid}>{column.name}</TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody emptyContent={"No products found"} items={sortedItems}>
                                        {(item) => (
                                            <TableRow key={item.id}>
                                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}