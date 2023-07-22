"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "@/app/data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatRupees } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget Line Items " />
    ),
    cell: ({ row }) => (
      <div className="max-w-[350px] truncate font-medium capitalize">
        {row.getValue("title")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "lockedBudget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Locked Budget" />
    ),
    cell: ({ row }) => {
      /**
       * CURRENCY FORMATING
       * formating Currency here and storing in "amount" variable
       *
       */

      let lockedAmount = formatRupees(row.getValue("lockedBudget"));

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {lockedAmount}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "actualCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actual Cost" />
    ),
    cell: ({ row }) => {
      /**
       * CURRENCY FORMATING
       * formating Currency here and storing in "amount" variable
       */

      let actualAmount = formatRupees(row.getValue("actualCost"));

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {actualAmount}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "variance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variance (diff)" />
    ),

    cell: ({ row }) => {
      /**
       * CURRENCY FORMATING / CALCULATING REMAINGIN AMOUNT
       * formating Currency here and storing in "amount" variable and,
       * caluclating remaining amount
       */
      const lockedBudget: number = row.getValue("lockedBudget");
      const actualCost: number = row.getValue("actualCost");

      let varianceAmount: number = lockedBudget - actualCost;

      // Assuming the 'formatRupees' function is imported and defined properly
      const formattedVarianceAmount: string = formatRupees(varianceAmount);

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formattedVarianceAmount}
          </span>
        </div>
      );
    },
  },

  {
    id: "VariancePercentage",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variance (%)" />
    ),
    cell: ({ row }) => {
      /**
       * CURRENCY FORMATING / CALCULATING REMAINGIN AMOUNT
       * formating Currency here and storing in "amount" variable and,
       * caluclating remaining amount
       */
      const lockedBudget: number = row.getValue("lockedBudget");
      const actualCost: number = row.getValue("actualCost");

      let amountPercentage: number = (actualCost / lockedBudget) * 100;

      // Round the percentage to 2 decimal places
      const adjustedPercentage: number = Math.round(amountPercentage);

      // Conditionally set color class based on adjustedPercentage
      let colorClass = "text-black"; // Fallback to black for other cases

      if (adjustedPercentage < 40) {
        colorClass = "bg-green-50 border-green-500 text-green-500";
      } else if (adjustedPercentage >= 40 && adjustedPercentage < 80) {
        colorClass = "bg-yellow-50 border-yellow-500 text-yellow-500";
      } else if (adjustedPercentage >= 80) {
        colorClass = "bg-red-50 border-red-500 text-red-500";
      }
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={`text-white ${colorClass}`}>
            {`${adjustedPercentage} %`}
          </Badge>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Title" />
  //   ),
  //   cell: ({ row }) => {
  //     const label = labels.find((label) => label.value === row.original.label);

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.getValue("title")}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}

  //         <Badge variant="outline">{priority.label}</Badge>
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
