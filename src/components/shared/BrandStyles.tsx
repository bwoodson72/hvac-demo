import type { SiteSettingsData } from "@/lib/sanity/types"

export function BrandStyles({ settings }: { settings: SiteSettingsData | null }) {
  const b = settings?.branding
  if (!b) return null
  const vars = [
    b.primaryColor && `--primary: ${b.primaryColor};`,
    b.primaryForeground && `--primary-foreground: ${b.primaryForeground};`,
    b.secondaryColor && `--secondary: ${b.secondaryColor}; --accent: ${b.secondaryColor};`,
    b.secondaryForeground && `--secondary-foreground: ${b.secondaryForeground}; --accent-foreground: ${b.secondaryForeground};`,
  ].filter(Boolean).join(" ")
  if (!vars) return null
  return <style>{`:root { ${vars} }`}</style>
}
