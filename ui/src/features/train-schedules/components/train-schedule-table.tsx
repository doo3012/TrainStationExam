"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { TrainSchedule } from "../types/train-schedule";

type TrainScheduleTableProps = {
  data: TrainSchedule[];
  actions?: (schedule: TrainSchedule) => React.ReactNode;
};

function formatDate(value: string) {
  return value.slice(0, 10);
}

function formatTime(value: string) {
  return value.slice(0, 5);
}

export function TrainScheduleTable({ data, actions }: TrainScheduleTableProps) {
  const columns: ColumnDef<TrainSchedule>[] = [
    {
      accessorKey: "trainNo",
      header: "Train No",
      cell: ({ row }) => (
        <span className="font-semibold text-[#20201d]">
          {row.original.trainNo}
        </span>
      ),
    },
    {
      accessorKey: "trainDate",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.trainDate),
    },
    {
      accessorKey: "trainTime",
      header: "Time",
      cell: ({ row }) => formatTime(row.original.trainTime),
    },
    {
      accessorKey: "gate",
      header: "Gate",
    },
    {
      accessorKey: "fromStation",
      header: "From",
    },
    {
      accessorKey: "toStation",
      header: "To",
    },
    {
      accessorKey: "remark",
      header: "Remark",
      cell: ({ row }) => row.original.remark || "-",
    },
  ];

  if (actions) {
    columns.push({
      id: "actions",
      header: "",
      cell: ({ row }) => actions(row.original),
    });
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden border border-[#d9d1c3] bg-[#fffaf2]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead className="bg-[#2d2c28] text-left text-xs uppercase tracking-[0.12em] text-[#f6f3ee]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[#e5ddcf] hover:bg-[#f5ecdd]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
