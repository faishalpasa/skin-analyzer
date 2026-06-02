import type { FaceDetection } from "face-api.js"

import {
  ACCENT_MAP,
  COVERAGE_MAP,
  FOUNDATION_MAP,
  SKIN_TYPE_MAP,
} from "@/constants/skinAnalyzer"
import type {
  BlemishScore,
  OilinessScore,
  Recommendation,
  SkinAnalysisResult,
  SkinTone,
} from "@/types/skin"

export const analyzeSkin = (
  canvas: HTMLCanvasElement,
  detection: FaceDetection,
): SkinAnalysisResult | null => {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const { x, y, width, height } = detection.box

  const sampleX = Math.floor(x + width * 0.2)
  const sampleY = Math.floor(y + height * 0.15)
  const sampleW = Math.floor(width * 0.6)
  const sampleH = Math.floor(height * 0.65)

  const clampedX = Math.max(0, sampleX)
  const clampedY = Math.max(0, sampleY)
  const clampedW = Math.min(sampleW, canvas.width - clampedX)
  const clampedH = Math.min(sampleH, canvas.height - clampedY)

  if (clampedW <= 0 || clampedH <= 0) return null

  const imageData = ctx.getImageData(clampedX, clampedY, clampedW, clampedH)
  const pixels = imageData.data

  let totalR = 0
  let totalG = 0
  let totalB = 0
  let skinPixelCount = 0
  const variancePixels: Array<{ r: number; g: number; b: number }> = []

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    if (isSkinPixel(r, g, b)) {
      totalR += r
      totalG += g
      totalB += b
      skinPixelCount++
      variancePixels.push({ r, g, b })
    }
  }

  if (skinPixelCount < 50) return null

  const avgR = totalR / skinPixelCount
  const avgG = totalG / skinPixelCount
  const avgB = totalB / skinPixelCount

  const skinTone = classifySkinTone(avgR, avgG, avgB)
  const blemishScore = calcBlemishScore(variancePixels, avgR, avgG, avgB)
  const oilinessScore = calcOilinessScore(avgR, avgG, avgB)

  return {
    avgR: Math.round(avgR),
    avgG: Math.round(avgG),
    avgB: Math.round(avgB),
    skinTone,
    blemishScore,
    oilinessScore,
    recommendations: getMakeupRecommendations(
      skinTone,
      blemishScore,
      oilinessScore,
    ),
  }
}

const isSkinPixel = (r: number, g: number, b: number): boolean => {
  const basicCheck = r > 95 && g > 40 && b > 20 && r > g && r > b
  if (!basicCheck) return false
  if (r > 220) return true
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return max - min > 15 && Math.abs(r - g) > 15
}

const toHex = (val: number): string =>
  Math.round(val).toString(16).padStart(2, "0")

const classifySkinTone = (r: number, g: number, b: number): SkinTone => {
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

  if (luminance > 190)
    return { id: "very-fair", label: "Sangat Cerah", emoji: "🌸", hex }
  if (luminance > 160) return { id: "fair", label: "Cerah", emoji: "✨", hex }
  if (luminance > 130)
    return { id: "medium", label: "Sawo Matang Muda", emoji: "🌟", hex }
  if (luminance > 100)
    return { id: "tan", label: "Sawo Matang", emoji: "🌻", hex }
  if (luminance > 70) return { id: "dark", label: "Gelap", emoji: "🌙", hex }
  return { id: "very-dark", label: "Sangat Gelap", emoji: "🌑", hex }
}

const calcBlemishScore = (
  pixels: Array<{ r: number; g: number; b: number }>,
  avgR: number,
  avgG: number,
  avgB: number,
): BlemishScore => {
  let blemishPixels = 0
  for (const { r, g, b } of pixels) {
    const dist = Math.sqrt(
      Math.pow(r - avgR, 2) + Math.pow(g - avgG, 2) + Math.pow(b - avgB, 2),
    )
    if (dist > 35) blemishPixels++
  }
  const ratio = blemishPixels / pixels.length
  if (ratio < 0.05) return { score: "clean", label: "Bersih", level: 0 }
  if (ratio < 0.12) return { score: "mild", label: "Sedikit Bercak", level: 1 }
  if (ratio < 0.22)
    return { score: "moderate", label: "Bercak Sedang", level: 2 }
  return { score: "heavy", label: "Banyak Bercak", level: 3 }
}

const calcOilinessScore = (r: number, g: number, b: number): OilinessScore => {
  const brightness = (r + g + b) / 3
  const redBias = r - (g + b) / 2
  const oilyScore = (brightness / 255) * 0.5 + (redBias / 128) * 0.5

  if (oilyScore < 0.3) return { score: "dry", label: "Kering" }
  if (oilyScore < 0.55) return { score: "normal", label: "Normal" }
  if (oilyScore < 0.75) return { score: "combination", label: "Kombinasi" }
  return { score: "oily", label: "Berminyak" }
}

const getMakeupRecommendations = (
  skinTone: SkinTone,
  blemish: BlemishScore,
  oiliness: OilinessScore,
): Recommendation[] => {
  const recs: Recommendation[] = []

  const foundation = FOUNDATION_MAP[skinTone.id]
  recs.push({
    category: "Foundation",
    icon: "💄",
    product: foundation.shade,
    tip: `Undertone: ${foundation.undertone}`,
  })

  recs.push({
    category: "Coverage",
    icon: "🎨",
    product: COVERAGE_MAP[blemish.score],
    tip:
      blemish.level >= 2
        ? "Gunakan setting spray agar tahan lama"
        : "Setting powder ringan sudah cukup",
  })

  const skinType = SKIN_TYPE_MAP[oiliness.score]
  recs.push({
    category: "Primer",
    icon: "🧴",
    product: skinType.primer,
    tip: `Kulit ${oiliness.label.toLowerCase()} — pakai sebelum foundation`,
  })
  recs.push({
    category: "Setting",
    icon: "✨",
    product: skinType.setting,
    tip: skinType.finish,
  })

  const accent = ACCENT_MAP[skinTone.id]
  recs.push({
    category: "Blush",
    icon: "🌸",
    product: accent.blush,
    tip: "Sapukan di apple of the cheeks ke arah pelipis",
  })
  recs.push({
    category: "Highlight",
    icon: "💫",
    product: accent.highlight,
    tip: "Aplikasikan di tulang pipi, hidung, dan cupid's bow",
  })

  return recs
}
