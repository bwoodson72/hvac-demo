import { cn } from "@/lib/utils"
import type { ContainerSize } from "@/styles/tokens"

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
}

interface ContainerProps {
  size?: ContainerSize
  className?: string
  children: React.ReactNode
}

export function Container({ size = "lg", className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeStyles[size], className)}>
      {children}
    </div>
  )
}
