import * as Tooltip from "@radix-ui/react-tooltip"
import { ReactNode, useState } from "react"

type TooltipPopoverProps = {
  label: string
  children: ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

export const TooltipPopover = ({
  children,
  label,
  side
}: TooltipPopoverProps) => {
  const [_, setIsOpen] = useState(false)
  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root onOpenChange={setIsOpen}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Content
          side={side}
          sideOffset={4}
          className="z-50 mx-1 flex select-none items-center justify-center rounded bg-black/50 px-2 py-1 text-xs font-medium"
        >
          {label}
          <Tooltip.Arrow width={11} height={5} className="fill-black/50" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
