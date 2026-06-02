import type {
  BlemishScore,
  OilinessScore,
  SkinTone,
  SkinToneId,
} from "@/types/skin"

export const SKIN_TONE_THRESHOLDS: Array<{
  minLuminance: number
  tone: Omit<SkinTone, "hex">
}> = [
  {
    minLuminance: 190,
    tone: { id: "very-fair", label: "Sangat Cerah", emoji: "🌸" },
  },
  { minLuminance: 160, tone: { id: "fair", label: "Cerah", emoji: "✨" } },
  {
    minLuminance: 130,
    tone: { id: "medium", label: "Sawo Matang Muda", emoji: "🌟" },
  },
  { minLuminance: 100, tone: { id: "tan", label: "Sawo Matang", emoji: "🌻" } },
  { minLuminance: 70, tone: { id: "dark", label: "Gelap", emoji: "🌙" } },
  {
    minLuminance: 0,
    tone: { id: "very-dark", label: "Sangat Gelap", emoji: "🌑" },
  },
]

export const BLEMISH_THRESHOLDS: Array<{
  maxRatio: number
  result: BlemishScore
}> = [
  { maxRatio: 0.05, result: { score: "clean", label: "Bersih", level: 0 } },
  {
    maxRatio: 0.12,
    result: { score: "mild", label: "Sedikit Bercak", level: 1 },
  },
  {
    maxRatio: 0.22,
    result: { score: "moderate", label: "Bercak Sedang", level: 2 },
  },
  {
    maxRatio: Infinity,
    result: { score: "heavy", label: "Banyak Bercak", level: 3 },
  },
]

export const OILINESS_THRESHOLDS: Array<{
  maxScore: number
  result: OilinessScore
}> = [
  { maxScore: 0.3, result: { score: "dry", label: "Kering" } },
  { maxScore: 0.55, result: { score: "normal", label: "Normal" } },
  { maxScore: 0.75, result: { score: "combination", label: "Kombinasi" } },
  { maxScore: Infinity, result: { score: "oily", label: "Berminyak" } },
]

export const COVERAGE_TIPS: Record<"low" | "high", string> = {
  low: "Setting powder ringan sudah cukup",
  high: "Gunakan setting spray agar tahan lama",
}

export const BLEMISH_HEAVY_TIP_THRESHOLD = 2

export const FOUNDATION_MAP: Record<
  SkinToneId,
  { shade: string; undertone: string }
> = {
  "very-fair": {
    shade: "Ivory / Porcelain",
    undertone: "Cool pink atau neutral",
  },
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
  "very-fair": {
    blush: "Baby pink atau peach muda",
    highlight: "Silver / pearl highlighter",
  },
  fair: { blush: "Peach atau coral muda", highlight: "Champagne highlighter" },
  medium: { blush: "Coral atau dusty rose", highlight: "Gold atau rose gold" },
  tan: { blush: "Terracotta atau brick rose", highlight: "Bronze gold" },
  dark: { blush: "Berry atau plum", highlight: "Deep bronze atau copper" },
  "very-dark": {
    blush: "Deep wine atau rich berry",
    highlight: "Copper atau rich gold",
  },
}
