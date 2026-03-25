import React from "react";
import { useTextarea } from "../../headless/textarea/useTextarea.js";
import type { TextareaProps } from "./types.js";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    const behavior = useTextarea(props);
    return <textarea ref={ref} {...behavior} className={`fluid-textarea ${className}`.trim()} />;
  }
);
