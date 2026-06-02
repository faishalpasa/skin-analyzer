export type PageName = "landing" | "camera" | "result"

export type SkinToneId =
  | "very-fair"
  | "fair"
  | "medium"
  | "tan"
  | "dark"
  | "very-dark"

export interface SkinTone {
  id: SkinToneId
  label: string
  emoji: string
  hex: string
}

export interface BlemishScore {
  score: "clean" | "mild" | "moderate" | "heavy"
  label: string
  level: 0 | 1 | 2 | 3
}

export interface OilinessScore {
  score: "dry" | "normal" | "combination" | "oily"
  label: string
}

export interface Recommendation {
  category: string
  icon: string
  product: string
  tip: string
}

export interface AnalysisError {
  error: string
}

export interface SkinAnalysisResult {
  avgR: number
  avgG: number
  avgB: number
  skinTone: SkinTone
  blemishScore: BlemishScore
  oilinessScore: OilinessScore
  recommendations: Recommendation[]
}
