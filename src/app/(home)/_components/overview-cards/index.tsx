"use client";

import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import { useEffect, useState } from "react";
import { fetchOverviewData, type TimeFilter, type OverviewDataType } from "./mock-data";
import { ShoppingCart, DollarSign, TrendingUp, Package, Users } from "lucide-react";

type Props = {
  selectedPeriod: TimeFilter;
};

export function OverviewCardsGroup({ selectedPeriod }: Props) {
  const [data, setData] = useState<OverviewDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data whenever period changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const overviewData = await fetchOverviewData(selectedPeriod);
      setData(overviewData);
      setIsLoading(false);
    };

    loadData();
  }, [selectedPeriod]);

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div className="h-14 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="mt-6 space-y-3">
              <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-5 2xl:gap-6">
      <OverviewCard
        label="Total Orders"
        data={{
          ...data.orders,
          value: compactFormat(data.orders.value),
        }}
        icon={ShoppingCart}
        iconBgColor="bg-cyan-100 dark:bg-cyan-900/20"
        iconColor="text-white"
        gradientBg="bg-[linear-gradient(180deg,#36C1CC_0%,#6EF2FF_100%)]"
        currentFilter={selectedPeriod}
        isLoading={isLoading}
      />

      <OverviewCard
        label="Total Sales"
        data={{
          ...data.sales,
          value: compactFormat(data.sales.value),
        }}
        icon={DollarSign}
        iconBgColor="bg-orange-100 dark:bg-orange-900/20"
        iconColor="text-white"
        gradientBg="bg-[linear-gradient(180deg,#FF884D_0%,rgba(255,136,77,0.373)_100%)]"
        currentFilter={selectedPeriod}
        isLoading={isLoading}
      />

      <OverviewCard
        label="Total Users"
        data={{
          ...data.users,
          value: compactFormat(data.users.value),
        }}
        icon={Users}
        iconBgColor="bg-yellow-100 dark:bg-yellow-900/20"
        iconColor="text-white"
        gradientBg="bg-[linear-gradient(180deg,rgba(255,196,77,0.941)_0%,#FCE2A1_100%)]"
        currentFilter={selectedPeriod}
        isLoading={isLoading}
      />

      <OverviewCard
        label="Total Revenue"
        data={{
          ...data.revenue,
          value: compactFormat(data.revenue.value),
        }}
        icon={TrendingUp}
        iconBgColor="bg-teal-100 dark:bg-teal-900/20"
        iconColor="text-white"
        gradientBg="bg-[linear-gradient(180deg,#4EDBC3_0%,rgba(78,219,195,0.486)_100%)]"
        currentFilter={selectedPeriod}
        isLoading={isLoading}
      />

      <OverviewCard
        label="Total Products"
        data={{
          ...data.products,
          value: compactFormat(data.products.value),
        }}
        icon={Package}
        iconBgColor="bg-pink-100 dark:bg-pink-900/20"
        iconColor="text-white"
        gradientBg="bg-[linear-gradient(180deg,#FF4DA5_0%,rgba(255,77,165,0.341)_100%)]"
        currentFilter={selectedPeriod}
        isLoading={isLoading}
      />
    </div>
  );
}
