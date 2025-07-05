import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, children }) => (
  <div className={cn("border rounded-lg shadow-sm bg-white", className)}>{children}</div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn("border-b p-4", className)}>{children}</div>
);

export const CardTitle = ({ className, children }) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
);

export const CardDescription = ({ className, children }) => (
  <p className={cn("text-sm text-gray-500", className)}>{children}</p>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-4", className)}>{children}</div>
);
