import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "bd92fa16",
      amount: 250,
      status: "success",
      email: "alice@example.com",
    },
    {
      id: "41f8e312",
      amount: 75,
      status: "failed",
      email: "bob@example.com",
    },
    {
      id: "f3271bc9",
      amount: 180,
      status: "pending",
      email: "carol@example.com",
    },
    {
      id: "ea76342b",
      amount: 320,
      status: "processing",
      email: "dave@example.com",
    },
    {
      id: "538d9fa0",
      amount: 60,
      status: "success",
      email: "eve@example.com",
    },
  ];
}

export default async function DataPortal() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
