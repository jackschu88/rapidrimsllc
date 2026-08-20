import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-[color,background-color,border-color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-hover",
        outline:
          "border border-steel/35 bg-transparent text-fg hover:border-fg/70 hover:bg-fg/5",
        surface: "bg-surface text-fg border border-border hover:bg-surface-2",
        ghost: "text-fg hover:bg-fg/8",
      },
      size: {
        sm: "h-10 min-h-10 px-3.5 text-sm rounded-sm",
        md: "h-12 min-h-12 px-5 text-[0.95rem] rounded-md",
        lg: "h-14 min-h-14 px-6 text-base rounded-md",
        xl: "h-16 min-h-16 px-7 text-lg rounded-lg w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
