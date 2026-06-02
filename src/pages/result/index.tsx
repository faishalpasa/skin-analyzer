import type { SkinAnalysisResult } from "@/types/skin"

interface Props {
  result: SkinAnalysisResult
  onRetry: () => void
}

const BLEMISH_TEXT_COLOR = [
  "text-teal-600",
  "text-amber-600",
  "text-orange-500",
  "text-red-500",
]
const BLEMISH_BG_COLOR = [
  "bg-teal-50 border-teal-200",
  "bg-amber-50 border-amber-200",
  "bg-orange-50 border-orange-200",
  "bg-red-50 border-red-200",
]

const ResultPage = ({ result, onRetry }: Props) => {
  const { skinTone, blemishScore, oilinessScore, recommendations } = result

  const blemishColor = BLEMISH_TEXT_COLOR[blemishScore.level]
  const blemishBg = BLEMISH_BG_COLOR[blemishScore.level]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="text-teal-600 font-bold text-base tracking-wide">
          UjeLab
        </span>
        <h2 className="text-gray-700 font-semibold text-sm">
          Hasil Analisis
        </h2>
        <div className="w-16" />
      </header>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-3">
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="bg-teal-500 px-5 py-3">
            <p className="text-white text-xs font-semibold tracking-widest uppercase">
              Warna Kulit
            </p>
          </div>
          <div className="p-5 flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex-shrink-0 ring-4 ring-gray-100"
              style={{ backgroundColor: skinTone.hex }}
            />
            <div className="flex-1">
              <p className="text-xl font-bold text-gray-900">
                {skinTone.emoji} {skinTone.label}
              </p>
              <p className="text-sm text-gray-400 font-mono mt-0.5">
                {skinTone.hex.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={`bg-white border rounded-2xl p-4 ${blemishBg}`}>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
              Kondisi Kulit
            </p>
            <p className={`text-sm font-bold ${blemishColor}`}>
              {blemishScore.label}
            </p>
          </div>
          <div className="bg-white border border-teal-100 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
              Tipe Kulit
            </p>
            <p className="text-sm font-bold text-teal-600">
              {oilinessScore.label}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-1 h-4 bg-teal-500 rounded-full" />
            <h3 className="font-bold text-gray-900 text-sm">
              Rekomendasi Makeup
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex gap-4 px-5 py-4">
                <span className="text-xl flex-shrink-0 mt-0.5">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest mb-0.5">
                    {rec.category}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {rec.product}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {rec.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-semibold py-4 rounded-full hover:bg-teal-600 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <span>📸</span> Deteksi Ulang
        </button>

        <p className="text-center text-xs text-gray-300 pb-2">
          © 2024 UjeLab · AI Beauty Analyzer
        </p>
      </div>
    </div>
  )
}

export default ResultPage
