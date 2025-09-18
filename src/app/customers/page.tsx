"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "../ui-elements/Switch/Switch";
import { Eye, Trash2, RefreshCcw } from "lucide-react";
import { SearchBox } from "@/components/FormElements/SearchBox/SearchBox";
import { Pagination } from "@/components/ui/pagination";
import { LoadingSpinner } from "@/components/Loading/TableLoading";
import { useChangeCustomerStatus, useGetAllCustomers } from "@/hooks/useCustomers";


interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: "user" | "admin";
  image?: string;
  countryCode: string;
  createdAt: string;
  isActive: boolean;
  isBlocked: boolean;
}

const UserTable: React.FC = () => {
  // UI state
  const [tab, setTab] = useState<"all" | "active" | "inactive" | "blocked">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "createdAt">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // Build query based on tab
  const query: Record<string, any> = { search, sortBy, sortOrder:order, page };
  if (tab === "active") query.isActive = true;
  if (tab === "inactive") query.isActive = false;
  if (tab === "blocked") query.isBlocked = true;

 
  const { data, refetch, isFetching, isLoading,error } = useGetAllCustomers(query);
  const {mutate:changeStatus} = useChangeCustomerStatus()
 

  

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        {/* Tabs */}
        <div className="flex gap-2">
          {["all", "active", "inactive", "blocked"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                tab === t
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <SearchBox value={search} onChange={(value) => setSearch(value)} />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* Reload */}
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 shadow transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          disabled={isFetching}
        >
          <RefreshCcw size={18} className={isFetching ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Table */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
            <LoadingSpinner size={60} />
          </div>
        )}

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Country Code</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Blocked</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.customers?.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.countryCode}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch checked={user.isActive} onChange={() => {changeStatus(user?._id)}} />
                </TableCell>
                <TableCell>
                  <Switch checked={user.isBlocked} onChange={() => {}} />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Eye size={18} className="text-blue-600" />
                  <Trash2 size={18} className="text-red-600" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        onPageChange={(pageCount) => setPage(pageCount)}
        totalPages={Math.ceil((data?.data?.total || 0) / 10)}
      />
    </div>
  );
};

export default UserTable;
