interface Props {
  onStart: () => void
}

const LandingPage = ({ onStart }: Props) => (
  <div className="min-h-screen bg-white flex flex-col">
    <header className="px-6 py-5 border-b border-gray-100">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-teal-600 font-bold text-lg tracking-wide">
          UjeLab
        </span>
        <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">
          AI Beauty Analyzer
        </span>
      </div>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="text-center max-w-md">
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">💄</span>
          </div>
        </div>

        <p className="text-teal-500 text-xs font-semibold tracking-widest uppercase mb-3">
          Real-time Skin Detection
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Skin Analyzer
          <span className="block text-teal-500 mt-1">& Makeup Guide</span>
        </h1>

        <p className="text-gray-500 text-base mb-10 leading-relaxed">
          Deteksi warna kulit, bercak, dan kondisi kulit kamu secara real-time.
          Dapatkan rekomendasi makeup yang cocok untukmu!
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <span className="text-xs font-medium text-teal-600 px-4 py-2 border border-teal-200 rounded-full bg-teal-50">
            Analisis kulit real-time
          </span>
          <span className="text-xs font-medium text-teal-600 px-4 py-2 border border-teal-200 rounded-full bg-teal-50">
            100% privat & lokal
          </span>
          <span className="text-xs font-medium text-teal-600 px-4 py-2 border border-teal-200 rounded-full bg-teal-50">
            Rekomendasi makeup
          </span>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-teal-500 text-white text-base font-semibold px-10 py-4 rounded-full hover:bg-teal-600 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <span className="text-xl">📸</span>
          Mulai Analisis
        </button>

        <p className="mt-6 text-xs text-gray-400">
          Kamera hanya digunakan di perangkat kamu. Data tidak dikirim ke server
          manapun.
        </p>
      </div>
    </main>

    <footer className="border-t border-gray-100 py-5" />
  </div>
)

export default LandingPage
