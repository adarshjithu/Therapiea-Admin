"use client";

import { useState } from "react";
import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/ui/dropdown";
import type { TimeFilter } from "./overview-cards/mock-data";

type Props = {
  onPeriodChange: (period: TimeFilter) => void;
  selectedPeriod: TimeFilter;
};

const TIME_PERIODS = [
  { value: "today" as TimeFilter, label: "Today" },
  { value: "this week" as TimeFilter, label: "This Week" },
  { value: "this month" as TimeFilter, label: "This Month" },
  { value: "this year" as TimeFilter, label: "This Year" },
];

export function OverviewHeader({ onPeriodChange, selectedPeriod }: Props) {
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const handlePeriodChange = (period: TimeFilter) => {
    onPeriodChange(period);
    setIsPeriodOpen(false);
  };

  const selectedPeriodLabel = TIME_PERIODS.find(p => p.value === selectedPeriod)?.label || "This Year";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-dark dark:text-white">
        Overview
      </h2>
      
      {/* Time Period Filter */}
      <Dropdown isOpen={isPeriodOpen} setIsOpen={setIsPeriodOpen}>
        <DropdownTrigger
          className={cn(
            "flex h-10 items-center justify-between gap-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-dark outline-none transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-dark dark:text-white dark:hover:bg-gray-800 [&[data-state='open']>svg]:rotate-0"
          )}
        >
          <span>{selectedPeriodLabel}</span>
          <ChevronUpIcon className="size-4 rotate-180 transition-transform" />
        </DropdownTrigger>

        <DropdownContent
          align="end"
          className="min-w-[10rem] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-dark"
        >
          <ul>
            {TIME_PERIODS.map((period) => (
              <li key={period.value}>
                <button
                  className={cn(
                    "flex w-full select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                    selectedPeriod === period.value && "bg-gray-100 font-medium dark:bg-gray-800"
                  )}
                  onClick={() => handlePeriodChange(period.value)}
                >
                  {period.label}
                </button>
              </li>
            ))}
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

