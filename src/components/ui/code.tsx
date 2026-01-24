import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  code: string
  language?: string
}

const Code = forwardRef<HTMLElement, CodeProps>(
  ({ className, code, language, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        data-language={language}
        {...props}
      >
        {code}
      </code>
    )
  }
)
Code.displayName = "Code"

export { Code }
