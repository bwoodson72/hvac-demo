import type { SiteSettingsData } from "@/lib/sanity/types"

export function BrandStyles({ settings }: { settings: SiteSettingsData | null }) {
  const b = settings?.branding
  if (!b) return null
  const vars = [
    b.primaryColor?.hex && `--primary: ${b.primaryColor.hex};`,
    b.primaryForeground?.hex && `--primary-foreground: ${b.primaryForeground.hex};`,
    b.secondaryColor?.hex && `--secondary: ${b.secondaryColor.hex}; --accent: ${b.secondaryColor.hex};`,
    b.secondaryForeground?.hex && `--secondary-foreground: ${b.secondaryForeground.hex}; --accent-foreground: ${b.secondaryForeground.hex};`,
  ].filter(Boolean).join(" ")
  if (!vars) return null
  return <style>{`:root { ${vars} }`}</style>
}
