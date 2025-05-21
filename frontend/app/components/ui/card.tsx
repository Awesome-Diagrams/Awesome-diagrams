import React from "react";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`border rounded p-4 shadow-sm bg-white ${props.className ?? ""}`}
    />
  );
}
