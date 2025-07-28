"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  person_id: string;
  person_name: string;
  // status: "pending" | "processing" | "success" | "failed";
  person_surname: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "person_name",
    header: "Name",
  },
  {
    accessorKey: "person_surname",
    header: "Surname",
  },
  // {
  //   accessorKey: "amount",
  //   header: "Amount",
  // },
];
