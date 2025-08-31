"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableUpdateButton?: boolean;
  setEnableUpdateButton?: React.Dispatch<React.SetStateAction<boolean>>;
  enableDeleteButton?: boolean;
  setEnableDeleteButton?: React.Dispatch<React.SetStateAction<boolean>>;
  setPersonKeySelectedForUpdate?: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableUpdateButton,
  setEnableUpdateButton,
  enableDeleteButton,
  setEnableDeleteButton,
  setPersonKeySelectedForUpdate,
}: DataTableProps<TData, TValue>) {
  const [filterName, setFilterName] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getRowId: (row) => row.person_id,
  });

  useEffect(() => {
    let selectedRowLength = Object.keys(rowSelection).length;
    if (
      selectedRowLength == 1 &&
      setEnableUpdateButton &&
      setEnableDeleteButton &&
      setPersonKeySelectedForUpdate
    ) {
      setEnableUpdateButton(true);
      setEnableDeleteButton(true);
      setPersonKeySelectedForUpdate(Object.keys(rowSelection)[0]);
    } else if (
      selectedRowLength > 1 &&
      setEnableUpdateButton &&
      setEnableDeleteButton &&
      setPersonKeySelectedForUpdate
    ) {
      setEnableDeleteButton(true);
      setEnableUpdateButton(false);
      setPersonKeySelectedForUpdate("");
    } else if (
      setEnableUpdateButton &&
      setEnableDeleteButton &&
      setPersonKeySelectedForUpdate
    ) {
      setEnableUpdateButton(false);
      setEnableDeleteButton(false);
      setPersonKeySelectedForUpdate("");
    }
  }, [rowSelection]);

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-gray-50">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              // console.log("row:", row);
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-gray-100 data-[state=selected]:text-gray-950"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
