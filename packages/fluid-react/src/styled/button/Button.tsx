import type { ButtonProps } from "./types";

export function Button({ children }: ButtonProps) {
  return <button type="button">{children}</button>;
}
