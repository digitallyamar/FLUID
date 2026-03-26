import type { ImgHTMLAttributes } from "react";

export type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};
