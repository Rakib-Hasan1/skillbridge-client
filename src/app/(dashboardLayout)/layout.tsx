import { Sidebar1 } from "@/components/sidebar1";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Sidebar1 />
    </div>
  );
}
