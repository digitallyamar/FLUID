import React from "react";
import type { AvatarProps } from "./types.js";

export function Avatar({ className = "", ...props }: AvatarProps) {
  return <img {...props} className={`fluid-avatar ${className}`.trim()} />;
}
