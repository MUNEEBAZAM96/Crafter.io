import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

/** Crafter.io original button link logic */
type Variant = "primary" | "secondary" | "ghost" | "inverse" | "ghostInverse";
type Size = "sm" | "md" | "lg";

const crafterVariants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-sm hover:bg-accent-hover hover:shadow-md active:translate-y-px",
  secondary:
    "bg-surface text-ink border border-line-strong hover:border-ink-muted hover:bg-elevated active:translate-y-px",
  ghost: "text-ink-soft hover:text-ink hover:bg-elevated",
  inverse:
    "bg-white text-[#0d1113] shadow-sm hover:bg-white/90 hover:shadow-md active:translate-y-px",
  ghostInverse: "text-white/70 hover:bg-white/10 hover:text-white",
};

const crafterSizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        "transition-all duration-200 ease-out select-none",
        crafterVariants[variant],
        crafterSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/** Shadcn ui button logic for internal components */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
