import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { Suspense } from "react";
import { ChatsCard } from "./_components/chats-card";
import { RegionLabels } from "./_components/region-labels";
import { DashboardContent } from "./_components/dashboard-content";

export default function Home() {
  return (
    <>
      <DashboardContent />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <Suspense fallback={<div className="col-span-12 xl:col-span-7 h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <PaymentsOverview
            className="col-span-12 xl:col-span-7"
          />
        </Suspense>

        <Suspense fallback={<div className="col-span-12 xl:col-span-5 h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <WeeksProfit
            className="col-span-12 xl:col-span-5"
          />
        </Suspense>

        <Suspense fallback={<div className="col-span-12 xl:col-span-5 h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <UsedDevices
            className="col-span-12 xl:col-span-5"
          />
        </Suspense>

        <RegionLabels />

        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense>
      </div>
    </>
  );
}
