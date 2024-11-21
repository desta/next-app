'use client'
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPagesCategory } from "@/redux/slices/pages/PagesCategory";
import Edit from "./Edit";
import Hapus from "./Hapus";
import Tambah from "./Tambah";


const columns = [
  { name: "Category", uid: "category" },
  { name: "Actions", uid: "actions" },
];

export default function TabelPagesCategory() {
  const dispatch = useDispatch()
  const category = useSelector((state) => state.PagesCategory.data);

  console.log('car',category);

  useEffect(() => {
    dispatch(fetchPagesCategory())
  }, [])

  const renderCell = React.useCallback((idx, columnKey) => {
    const cellValue = idx[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center">
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Edit params={idx} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Hapus params={idx} />
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
    <div className="text-right pb-3"><Tambah /></div>
      <Table aria-label="Tabel region" isStriped>
        <TableHeader columns={columns} >
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="bg-secondary text-secondary-foreground">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={category} emptyContent={"No categories found."}>
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
