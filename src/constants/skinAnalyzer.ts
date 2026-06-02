import type {
  BlemishScore,
  OilinessScore,
  SkinToneId,
} from "@/types/skin"

export const FOUNDATION_MAP: Record<
  SkinToneId,
  { shade: string; undertone: string }
> = {
  "very-fair": { shade: "Ivory / Porcelain", undertone: "Cool pink atau neutral" },
  fair: { shade: "Beige muda / Natural", undertone: "Neutral atau warm" },
  medium: { shade: "Sand / Warm Beige", undertone: "Warm golden" },
  tan: { shade: "Caramel / Honey", undertone: "Warm atau neutral" },
  dark: { shade: "Mocha / Espresso", undertone: "Deep warm" },
  "very-dark": { shade: "Deep / Ebony", undertone: "Rich warm" },
}

export const COVERAGE_MAP: Record<BlemishScore["score"], string> = {
  clean: "BB Cream atau tinted moisturizer — kulit kamu cukup bersih!",
  mild: "Foundation medium coverage untuk meratakan warna",
  moderate: "Full coverage foundation + concealer di area bercak",
  heavy: "Full coverage foundation + color corrector (hijau) sebelum concealer",
}

export const SKIN_TYPE_MAP: Record<
  OilinessScore["score"],
  { primer: string; finish: string; setting: string }
> = {
  dry: {
    primer: "Hydrating primer berbasis hyaluronic acid",
    finish: "Dewy / satin finish foundation",
    setting: "Setting spray, hindari bedak berlebih",
  },
  normal: {
    primer: "Silicone primer untuk hasil halus",
    finish: "Natural finish foundation",
    setting: "Light setting powder",
  },
  combination: {
    primer: "Mattifying primer di T-zone, hydrating di pipi",
    finish: "Semi-matte foundation",
    setting: "Translucent powder di T-zone",
  },
  oily: {
    primer: "Oil-control / mattifying primer",
    finish: "Matte finish foundation",
    setting: "Bedak tabur translucent + setting spray tahan minyak",
  },
}

export const ACCENT_MAP: Record<
  SkinToneId,
  { blush: string; highlight: string }
> = {
  "very-fair": { blush: "Baby pink atau peach muda", highlight: "Silver / pearl highlighter" },
  fair: { blush: "Peach atau coral muda", highlight: "Champagne highlighter" },
  medium: { blush: "Coral atau dusty rose", highlight: "Gold atau rose gold" },
  tan: { blush: "Terracotta atau brick rose", highlight: "Bronze gold" },
  dark: { blush: "Berry atau plum", highlight: "Deep bronze atau copper" },
  "very-dark": { blush: "Deep wine atau rich berry", highlight: "Copper atau rich gold" },
}
