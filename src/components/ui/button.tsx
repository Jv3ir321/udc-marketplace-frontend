import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#171a3d] text-white shadow-sm hover:bg-[#252a5c] active:scale-95",
        destructive:
          "bg-[#df4838] text-white shadow-sm hover:bg-[#c93b2d] active:scale-95",
        outline:
          "border border-slate-200 bg-white text-[#171a3d] shadow-2xs hover:bg-slate-50 hover:border-slate-300",
        secondary:
          "bg-slate-100 text-[#171a3d] hover:bg-slate-200/80 active:scale-95",
        ghost: "hover:bg-slate-100 text-[#171a3d]",
        link: "text-[#ec8026] underline-offset-4 hover:underline",
        udc: "bg-[#ec8026] text-white shadow-sm hover:bg-[#d97018] active:scale-95",
        navy: "bg-[#171a3d] text-white shadow-sm hover:bg-[#252a5c] active:scale-95",
        teal: "bg-[#3da898] text-white shadow-sm hover:bg-[#338e80] active:scale-95",
        gold: "bg-[#f2b725] text-[#171a3d] shadow-sm hover:bg-[#e0a71d] active:scale-95",
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
