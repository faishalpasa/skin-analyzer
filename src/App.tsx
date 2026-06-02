import { useState } from "react"

import CameraPage from "@/pages/camera"
import LandingPage from "@/pages/landing"
import ResultPage from "@/pages/result"
import type { PageName, SkinAnalysisResult } from "@/types/skin"

const App = () => {
  const [page, setPage] = useState<PageName>("landing")
  const [result, setResult] = useState<SkinAnalysisResult | null>(null)

  const handleResult = (r: SkinAnalysisResult) => {
    setResult(r)
    setPage("result")
  }

  console.log({ page, result })

  return (
    <>
      {page === "landing" && <LandingPage onStart={() => setPage("camera")} />}
      {page === "camera" && (
        <CameraPage onResult={handleResult} onBack={() => setPage("landing")} />
      )}
      {page === "result" && result && (
        <ResultPage result={result} onRetry={() => setPage("camera")} />
      )}
    </>
  )
}

export default App
