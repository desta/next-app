"use client"
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketCategory } from "@/redux/slices/TicketCategory";
import Edit from "./Edit";
import Hapus from "./Hapus";
import Tambah from "./Tambah";

const columns = [
    { uid: "category", name: "Category" },
    { uid: "actions", name: "Actions" },
];

export default function TabelCategoryTicket() {
    const dispatch = useDispatch();
    const ticketCategory = useSelector((state) => state.ticketcategory.data);

    useEffect(() => {
        dispatch(fetchTicketCategory())
    }, [])

    const renderCell = React.useCallback((category, columnKey) => {
        const cellValue = category[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Edit">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Edit params={category} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Hapus params={category} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="text-2xl font-bold mb-4">Category <span className="text-primary">ticket</span></div>
            <div className="pb-3 text-right">
                <Tambah />
            </div>
            <Table aria-label="Category ticket" isStriped removeWrapper>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={ticketCategory} emptyContent="Tidak ada data category.">
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
