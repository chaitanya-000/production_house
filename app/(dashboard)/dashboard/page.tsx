import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "@/components/IntialDataTable/columns";
import { DataTable } from "@/components/IntialDataTable/data-table";
import { taskSchema } from "@/app/data/schema";

import { Overview } from "@/components/overview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "casting details",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('https://preline.co/assets/svg/component/polygon-bg-element.svg')] before:opacity-[0.3] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 ">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Hey Chaitanya, here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        {/* <Overview /> */}

        <div>
          <Tabs defaultValue="tableView" className="">
            <TabsList className="grid w-[220px] grid-cols-2">
              <TabsTrigger value="tableView">Table View</TabsTrigger>
              <TabsTrigger value="chartView">Chart View</TabsTrigger>
            </TabsList>
            <TabsContent value="tableView">
              <DataTable data={tasks} columns={columns} />
            </TabsContent>
            <TabsContent value="chartView">
              <Overview data={tasks} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
