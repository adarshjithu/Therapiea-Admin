"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import type { TimeFilter } from "./mock-data";
import type { LucideIcon } from "lucide-react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate: number;
  };
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  gradientBg: string;
  currentFilter: TimeFilter;
  isLoading?: boolean;
};

export function OverviewCard({ 
  label, 
  data, 
  icon: Icon,
  iconBgColor,
  iconColor,
  gradientBg,
  currentFilter,
  isLoading = false
}: PropsType) {
  const isDecreasing = data.growthRate < 0;

  const getComparisonText = () => {
    switch(currentFilter) {
      case "today":
        return "Compared to Yesterday";
      case "this week":
        return "Compared to Last Week";
      case "this month":
        return "Compared to Last Month";
      case "this year":
        return "Compared to Last Year";
      default:
        return "Compared to Last Period";
    }
  };

  return (
    <div className=" bg-white shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-dark relative hover:shadow-md transition-shadow overflow-hidden">
      {/* Vertical colored bar on the left */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", gradientBg)} />
      
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-dark/50 rounded-lg flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className="p-4 pl-5">
        {/* Icon and Title side by side */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0",
              gradientBg
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor)} strokeWidth={2.5} />
          </div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </h4>
        </div>

        {/* Large number */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-dark dark:text-white">
            {data.value}
          </h3>
        </div>

        {/* Comparison text and badge */}
        {/* <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getComparisonText()}
          </p>
          
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md",
              isDecreasing 
                ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" 
                : "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
            )}
          >
            {isDecreasing ? (
              <ArrowDownIcon aria-hidden className="w-3 h-3" />
            ) : (
              <ArrowUpIcon aria-hidden className="w-3 h-3" />
            )}
            {Math.abs(data.growthRate)}%
          </span>
        </div> */}
      </div>
    </div>
  );
}
