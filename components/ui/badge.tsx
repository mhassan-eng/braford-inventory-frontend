import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge font-mono inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-2.5!",
  {
    variants: {
      variant: {
  default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
  secondary:
    "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
  destructive:
    "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
  outline:
    "border-border bg-input/20 text-foreground dark:bg-input/30 [a]:hover:bg-muted [a]:hover:text-muted-foreground",
  ghost:
    "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
  link: "text-primary underline-offset-4 hover:underline",

  green:
    "bg-green-50 border-green-500 text-green-800 dark:bg-green-950/40 dark:text-green-300 [a]:hover:bg-green-100",

  orange:
    "bg-orange-50 border-orange-400 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 [a]:hover:bg-orange-100",

  blue:
    "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 [a]:hover:bg-blue-100",

  purple:
    "bg-purple-50 border-purple-500 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 [a]:hover:bg-purple-100",

  pink:
    "bg-pink-50 border-pink-500 text-pink-800 dark:bg-pink-950/40 dark:text-pink-300 [a]:hover:bg-pink-100",

  cyan:
    "bg-cyan-50 border-cyan-500 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 [a]:hover:bg-cyan-100",

  yellow:
    "bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300 [a]:hover:bg-yellow-100",

  indigo:
    "bg-indigo-50 border-indigo-500 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 [a]:hover:bg-indigo-100",

  slate:
    "bg-slate-50 border-slate-400 text-slate-700 dark:bg-slate-950/40 dark:text-slate-300 [a]:hover:bg-slate-100",
},
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
