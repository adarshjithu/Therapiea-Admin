"use client";

import { useState } from "react";
import { OverviewCardsGroup } from "./overview-cards";
import { OverviewHeader } from "./overview-header";
import type { TimeFilter } from "./overview-cards/mock-data";

export function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimeFilter>("this year");

  return (
    <>
      <OverviewHeader 
        onPeriodChange={setSelectedPeriod}
        selectedPeriod={selectedPeriod}
      />
      <OverviewCardsGroup 
        selectedPeriod={selectedPeriod}
      />
    </>
  );
}

