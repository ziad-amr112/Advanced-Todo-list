"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TasksSkeleton() {
  return (
    <div className="p-6 min-h-screen bg-white text-black dark:bg-[#0e0b0b] dark:text-gray-200">
      <div className="border rounded-lg p-4 dark:border-gray-700 dark:bg-[#2a2a2a]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-300 dark:border-gray-700">
              <TableHead><Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700" /></TableHead>
              <TableHead><Skeleton className="h-4 w-40 bg-gray-300 dark:bg-gray-700" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(7)].map((_, index) => (
              <TableRow key={index} className="border-b border-gray-300 dark:border-gray-700">
                <TableCell><Skeleton className="h-6 w-48 bg-gray-300 dark:bg-gray-700" /></TableCell>
                <TableCell><Skeleton className="h-6 w-56 bg-gray-300 dark:bg-gray-700" /></TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="h-10 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-10 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
