import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-medium",
        outline: "border border-border bg-background hover:bg-muted hover:text-foreground shadow-soft hover:shadow-medium",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-soft hover:shadow-medium",
        ghost: "hover:bg-muted hover:text-foreground transition-smooth",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
        hero: "hero-gradient text-white font-semibold shadow-medium hover:shadow-strong hover:scale-105",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-medium",
        like: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 shadow-soft hover:shadow-medium",
        remind: "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 shadow-soft hover:shadow-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
