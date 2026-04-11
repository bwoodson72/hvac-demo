"use client"

import { createContext, useContext } from "react"
import type { SiteData } from "@/lib/sanity/types"

export type SiteContextValue = {
  phone?: string
  email?: string
  address?: SiteData["address"]
  businessHours?: SiteData["businessHours"]
}

export const SiteContext = createContext<SiteContextValue>({})
export const useSiteContext = () => useContext(SiteContext)

export function SiteContextProvider({
  value,
  children,
}: {
  value: SiteContextValue
  children: React.ReactNode
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}
