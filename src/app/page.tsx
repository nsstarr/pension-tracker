"use client";
// app/page.tsx
import PensionForm, { PensionData } from "./components/PensionForm";
import ProjectionChart from "./components/ProjectionChart";
import { useState } from "react";

export default function Home() {
  const [pensionData, setPensionData] = useState<PensionData | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-10 md:gap-10 lg:flex-row">
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <h1 className="mb-8 text-2xl font-bold">Pension Tracker</h1>
        <PensionForm onSubmit={setPensionData} />
      </section>
      {pensionData && <ProjectionChart data={pensionData} />}
    </div>
  );
}
