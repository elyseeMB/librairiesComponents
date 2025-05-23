import type React from "react";
import styles from "./Button.module.css";
import type {
  ButtonHTMLAttributes,
  JSX,
  PropsWithChildren,
  ReactNode,
} from "react";
import { classNames } from "../../../utils/dom.ts";

export const buttonVariants = [
  "primary",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
  "icon",
  "with-icon",
  "loading",
  "as-child",
] as const;

type ButtonVariant = (typeof buttonVariants)[number];

const size = ["small", "medium", "large"] as const;

type SizeProps = (typeof size)[number];

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  variant?: ButtonVariant;
  size?: SizeProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
};

export function Button({
  children,
  onClick,
  variant = "secondary",
  size = "medium",
  icon: IconElement,
  className,
  ...props
}: ButtonProps) {
  if (!variant && !size) {
    return "";
  }
  const variantClass = styles[variant] ?? "";
  const sizeClass = styles[size] ?? "";
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, variantClass, sizeClass, className)}
      {...props}
    >
      {IconElement && <>{IconElement}</>}
      {children}
    </button>
  );
}
