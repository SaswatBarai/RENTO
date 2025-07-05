import React from "react";
import { cn } from "@/lib/utils";

export const Separator = ({ className }) => (
  <div className={cn("h-px w-full bg-gray-200", className)} />
);
