"use client";
import React from "react";

// Define the structure for your column definitions
export interface Column<T> {
  header: string;
  // Allows targeting a key in the object or using a custom render function
  accessor?: keyof T;
  className?: string;
  // Custom render function for complex cells (e.g., badges, actions, user profiles)
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  rowClassName?: string | ((row: T) => string);
  rowOnClick?: (row: T) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  rowClassName,
  rowOnClick,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-100 bg-white">
      <table className="w-full border-collapse text-left text-sm text-slate-600">
        {/* Table Header */}
        <thead className="bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-4 font-medium ${column.className || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-50">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-slate-400"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              // Handle dynamic row classes (like highlighting the current user)
              const customRowClass =
                typeof rowClassName === "function"
                  ? rowClassName(row)
                  : rowClassName || "";

              return (
                <tr
                  key={keyExtractor(row, rowIndex)}
                  onClick={() => rowOnClick?.(row)}
                  className={`transition-colors hover:bg-slate-50/50 ${customRowClass}`}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`whitespace-nowrap px-6 py-4 align-middle ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(row)
                        : column.accessor
                          ? (row[column.accessor] as React.ReactNode)
                          : null}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
