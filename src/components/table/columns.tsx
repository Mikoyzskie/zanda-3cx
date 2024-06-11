"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "@/data/data"
import { Task, Calls } from "@/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Calls>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "Call_Name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone User" />
        ),
        cell: ({ row }) => {

            const text: string = row.getValue("Call_Recording")
            const regex = /\[(.*?)\]/;
            const match = text.match(regex);

            return (
                <div className="w-fit">
                    {
                        match && match[1]
                    }
                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "Call_Recording",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Call Source" />
        ),
        cell: ({ row }) => {
            // const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
                    <span className="max-w-[500px] truncate font-medium">
                        {
                            row.getValue("Call_Recording")
                        }
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "DeepGram",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {

            let status
            if (row.getValue("DeepGram")) {
                status = statuses.find(
                    (status) => status.value === "Transcribed"
                )
            } else {
                status = statuses.find(
                    (status) => status.value === "Not Transcribed"
                )
            }


            if (!status) {
                return null
            }

            return (
                <div className="flex w-fit items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}

                    {
                        <span>{status.label}</span>
                    }

                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // {
    //     accessorKey: "isTranscribed",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Status" />
    //     ),
    //     cell: ({ row }) => {
    //         const priority = priorities.find(
    //             (priority) => priority.value === row.getValue("isTranscribed")
    //         )

    //         if (!priority) {
    //             return null
    //         }

    //         return (
    //             <div className="flex items-center">
    //                 {priority.icon && (
    //                     <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //                 )}
    //                 <span>{priority.label}</span>
    //             </div>
    //         )
    //     },
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id))
    //     },
    // },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]