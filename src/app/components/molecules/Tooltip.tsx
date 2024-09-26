// Tooltip.tsx
"use client";
import React from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  id?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, id }) => {
  return (
    <div className="group relative">
      {children}
      <div
        id={id}
        role="tooltip"
        className="invisible absolute z-10 inline-block min-w-52 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:visible group-hover:opacity-100 dark:bg-gray-700"
      >
        {content}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};

export default Tooltip;
