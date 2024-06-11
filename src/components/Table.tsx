import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { UserNav } from "@/components/table/user-nav"
import { taskSchema, callSchema } from "@/data/schema"
import { getRecordings } from "@/lib/directus"
import { ModeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
    title: "Call Recordings",
    description: "Zanda call recording table",
}


// Simulate a database read for tasks.
// async function getTasks() {
//     const data = await fs.readFile(
//         path.join(process.cwd(), "src/data/tasks.json")
//     )

//     const tasks = JSON.parse(data.toString())

//     return z.array(taskSchema).parse(tasks)
// }

async function getCalls() {
    const data = await getRecordings()

    const dataS = JSON.stringify(data)
    const calls = JSON.parse(dataS)

    return z.array(callSchema).parse(calls)
}

export default async function TaskPage() {


    const calls = await getCalls()

    // console.log(calls);


    return (
        <>

            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your calls to transcribe
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ModeToggle />
                        <UserNav />
                    </div>
                </div>
                <DataTable data={calls} columns={columns} />
            </div>
        </>
    )
}