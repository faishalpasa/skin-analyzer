import * as faceapi from "face-api.js"
import { useCallback, useEffect, useRef, useState } from "react"

import type { SkinAnalysisResult } from "@/types/skin"
import { analyzeSkin } from "@/utils/skinAnalyzer"

const MODEL_URL = "/models"

type CameraStatus = "loading" | "ready" | "detecting" | "error"

interface Props {
  onResult: (result: SkinAnalysisResult) => void
  onBack: () => void
}

const CameraPage = ({ onResult, onBack }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number>(0)
  const scanAnimRef = useRef<number>(0)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [status, setStatus] = useState<CameraStatus>("loading")
  const [loadingMsg, setLoadingMsg] = useState("Memuat model AI...")
  const [faceDetected, setFaceDetected] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const stopAll = () => {
    cancelAnimationFrame(animFrameRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
  }

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    })
    streamRef.current = stream
    const video = videoRef.current
    if (video) {
      video.srcObject = stream
      await new Promise<void>((res) => {
        video.onloadedmetadata = () => res()
      })
      video.play()
    }
  }

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoadingMsg("Memuat model deteksi wajah...")
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        if (cancelled) return
        setLoadingMsg("Membuka kamera...")
        await startCamera()
        if (cancelled) return
        setStatus("ready")
      } catch (_err) {
        if (!cancelled) setStatus("error")
      }
    }

    load()
    return () => {
      cancelled = true
      stopAll()
    }
  }, [])

  const drawFaceBox = (
    ctx: CanvasRenderingContext2D,
    box: { x: number; y: number; width: number; height: number } | null,
    detected: boolean,
  ) => {
    if (!box) return
    const { x, y, width, height } = box
    const color = detected ? "#14b8a6" : "#f43f5e"
    ctx.strokeStyle = color
    ctx.lineWidth = 2.5
    ctx.shadowColor = color
    ctx.shadowBlur = 6

    const cornerLen = 22
    const corners: [number, number, number, number, number, number][] = [
      [x, y, cornerLen, 0, 0, cornerLen],
      [x + width, y, -cornerLen, 0, 0, cornerLen],
      [x, y + height, cornerLen, 0, 0, -cornerLen],
      [x + width, y + height, -cornerLen, 0, 0, -cornerLen],
    ]
    corners.forEach(([cx, cy, dx1, dy1, dx2, dy2]) => {
      ctx.beginPath()
      ctx.moveTo(cx + dx1, cy + dy1)
      ctx.lineTo(cx, cy)
      ctx.lineTo(cx + dx2, cy + dy2)
      ctx.stroke()
    })
  }

  useEffect(() => {
    if (status !== "ready") return

    const video = videoRef.current
    const overlay = overlayRef.current
    if (!video || !overlay) return

    const ctx = overlay.getContext("2d")
    if (!ctx) return

    const detect = async () => {
      if (!video || !overlay || !ctx) return
      if (video.readyState < 2) {
        animFrameRef.current = requestAnimationFrame(detect)
        return
      }

      overlay.width = video.videoWidth
      overlay.height = video.videoHeight

      const detection = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 320,
          scoreThreshold: 0.5,
        }),
      )

      ctx.clearRect(0, 0, overlay.width, overlay.height)

      if (detection) {
        setFaceDetected(true)
        drawFaceBox(ctx, detection.box, true)
      } else {
        setFaceDetected(false)
        drawFaceBox(ctx, null, false)
      }

      animFrameRef.current = requestAnimationFrame(detect)
    }

    animFrameRef.current = requestAnimationFrame(detect)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [status])

  useEffect(() => {
    if (!isScanning) return

    let pos = 0
    let dir = 1

    const animate = () => {
      pos += dir * 0.6
      if (pos >= 100) {
        pos = 100
        dir = -1
      }
      if (pos <= 0) {
        pos = 0
        dir = 1
      }
      if (scanLineRef.current) {
        scanLineRef.current.style.top = `${pos}%`
      }
      scanAnimRef.current = requestAnimationFrame(animate)
    }

    scanAnimRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(scanAnimRef.current)
  }, [isScanning])

  const captureAndAnalyze = useCallback(() => {
    if (status !== "ready") return
    setStatus("detecting")
    setIsScanning(true)
    cancelAnimationFrame(animFrameRef.current)

    let count = 5
    setCountdown(count)

    countdownRef.current = setInterval(async () => {
      count--
      if (count > 0) {
        setCountdown(count)
        return
      }

      if (countdownRef.current) clearInterval(countdownRef.current)
      setCountdown(null)

      const video = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas) return

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(video, 0, 0)

      const detection = await faceapi.detectSingleFace(
        canvas,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 320,
          scoreThreshold: 0.4,
        }),
      )

      if (!detection) {
        setIsScanning(false)
        setStatus("ready")
        return
      }

      const result = analyzeSkin(canvas, detection)
      stopAll()
      if (result) {
        onResult(result)
      } else {
        setIsScanning(false)
        setStatus("ready")
      }
    }, 1000)
  }, [status, onResult])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <button
          onClick={() => {
            stopAll()
            onBack()
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 text-sm cursor-pointer"
        >
          ← Kembali
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-teal-400 rounded-full" />
          <h2 className="text-gray-800 font-semibold text-sm">Skin Analyzer</h2>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-5">
        <div className="relative w-full max-w-md aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            className="w-full h-full object-cover scale-x-[-1]"
            muted
            playsInline
          />
          <canvas
            ref={overlayRef}
            className="absolute inset-0 w-full h-full scale-x-[-1]"
          />
          <canvas ref={canvasRef} className="hidden" />

          {status === "loading" && (
            <div className="absolute inset-0 bg-gray-950/95 flex flex-col items-center justify-center gap-4">
              <div className="w-9 h-9 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-sm">{loadingMsg}</p>
            </div>
          )}

          {status === "error" && (
            <div className="absolute inset-0 bg-gray-950/95 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-4xl">⚠️</span>
              <p className="text-white font-semibold">Gagal membuka kamera</p>
              <p className="text-gray-400 text-sm">
                Pastikan izin kamera sudah diberikan dan coba lagi.
              </p>
            </div>
          )}

          {isScanning && (
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-teal-400/5" />
              <div
                ref={scanLineRef}
                className="absolute left-0 right-0"
                style={{ top: "0%" }}
              >
                <div
                  className="absolute inset-x-0 bottom-full h-16"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(20, 184, 166, 0.12))",
                  }}
                />
                <div
                  className="h-[2px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #14b8a6, #2dd4bf, #14b8a6, transparent)",
                    boxShadow: "0 0 12px 4px rgba(20, 184, 166, 0.5)",
                  }}
                />
              </div>
            </div>
          )}

          {countdown !== null && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-5 py-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-white text-xs font-medium tracking-wide">
                  {countdown >= 4
                    ? "Mendeteksi wajah..."
                    : countdown >= 2
                      ? "Menganalisis kondisi kulit..."
                      : "Menyiapkan hasil analisis..."}
                </span>
              </div>
            </div>
          )}
        </div>

        {status === "ready" && (
          <div
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
              faceDetected
                ? "bg-teal-50 text-teal-600 border-teal-200"
                : "bg-gray-50 text-gray-500 border-gray-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${faceDetected ? "bg-teal-400 animate-pulse" : "bg-gray-400"}`}
            />
            {faceDetected
              ? "Wajah terdeteksi — siap dianalisis"
              : "Arahkan wajah ke kamera"}
          </div>
        )}

        {status === "ready" && !faceDetected && (
          <div className="max-w-xs text-center space-y-1.5">
            <p className="text-xs text-gray-400">
              Pastikan wajah berada di tengah frame dan terlihat jelas.
            </p>
            <ul className="text-xs text-gray-400 space-y-0.5">
              <li>• Pencahayaan cukup terang dan merata</li>
              <li>• Hindari cahaya latar yang terlalu terang</li>
              <li>• Wajah menghadap lurus ke kamera</li>
            </ul>
          </div>
        )}

        {status === "ready" && (
          <button
            onClick={captureAndAnalyze}
            disabled={!faceDetected}
            className={`flex items-center gap-3 text-white font-semibold px-8 py-4 rounded-full transition-all duration-150 cursor-pointer ${
              faceDetected
                ? "bg-teal-500 hover:bg-teal-600 active:scale-95"
                : "bg-gray-300 opacity-60 cursor-not-allowed"
            }`}
          >
            <span className="text-xl">🔬</span>
            Analisis Kulit Sekarang
          </button>
        )}

        {isScanning && (
          <div className="flex items-center gap-2 text-teal-500">
            <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Memindai wajah...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CameraPage
