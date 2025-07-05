import React from "react";

export const Checkbox = ({ id, ...props }) => (
  <input id={id} type="checkbox" className="w-4 h-4 border rounded" {...props} />
);
