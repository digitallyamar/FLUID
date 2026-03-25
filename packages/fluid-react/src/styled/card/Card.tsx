import React from "react";
import { useCard } from "../../headless/card/useCard.js";
import type { CardProps } from "./types.js";

export function Card({ className = "", children, ...props }: CardProps) {
  useCard();
  return (
    <div {...props} className={`fluid-card ${className}`.trim()}>
      {children}
    </div>
  );
}
