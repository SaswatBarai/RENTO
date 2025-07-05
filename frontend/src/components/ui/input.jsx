import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("w-full px-3 py-2 border rounded-md text-sm", className)}
    {...props}
  />
));

Input.displayName = "Input";
