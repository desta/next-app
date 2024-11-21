'use client'
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import Tambah from "./Tambah";
import Hapus from "./Hapus";
import Edit from "./Edit";
import { fetchArticleCategory } from "@/redux/slices/article/ArticleCategory";


const columns = [
  { name: "Category", uid: "category" },
  { name: "Actions", uid: "actions" },
];

export default function TabelArticleCategory() {
  const dispatch = useDispatch()
  const category = useSelector((state) => state.articlecategory.data);

  useEffect(() => {
    dispatch(fetchArticleCategory())
  }, [])

  const renderCell = React.useCallback((idx, columnKey) => {
    const cellValue = idx[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
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
        <TableBody items={category}>
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
