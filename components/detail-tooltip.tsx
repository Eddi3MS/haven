import React, { ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export const DetailTooltip = ({
  text,
  children,
}: {
  text: string
  children: ReactNode
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="inline-flex items-center gap-2 text-sm cursor-pointer text-accent-foreground font-semibold">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
