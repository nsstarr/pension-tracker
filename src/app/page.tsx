"use client";
// app/page.tsx
import PensionForm, { PensionData } from "./components/PensionForm";
import ProjectionChart from "./components/ProjectionChart";
import { useState } from "react";
import TrackerLayout from "./components/templates/TrackerLayout";

export default function Home() {
  const [pensionData, setPensionData] = useState<PensionData | null>(null);

  return (
    <TrackerLayout>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <h1 className="mb-8 text-2xl font-bold">Pension Tracker</h1>
        <PensionForm onSubmit={setPensionData} />
      </section>
      {pensionData && <ProjectionChart data={pensionData} />}
    </TrackerLayout>
  );
}
