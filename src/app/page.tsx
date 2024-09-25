"use client";
// app/page.tsx
import PensionForm, { PensionData } from "./components/PensionForm";
import ProjectionChart from "./components/ProjectionChart";
import { useState } from "react";

export default function Home() {
  const [pensionData, setPensionData] = useState<PensionData | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Pension Tracker</h1>
      <PensionForm onSubmit={setPensionData} />
      {pensionData && <ProjectionChart data={pensionData} />}
    </div>
  );
}
