'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import jsQR from 'jsqr'
import { X, Camera, RefreshCw, AlertTriangle, ShieldAlert, CheckCircle2, Zap } from 'lucide-react'
import { validateTableToken, extractTableTokenFromQr } from '@/lib/table-utils'
import type { Table } from '@/lib/types'

interface QrScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onScanSuccess: (table: Table) => void
}

export function QrScannerModal({ isOpen, onClose, onScanSuccess }: QrScannerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameIdRef = useRef<number | null>(null)

  const [permissionState, setPermissionState] = useState<'requesting' | 'granted' | 'denied' | 'unsupported' | 'error'>('requesting')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [scanError, setScanError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successTableName, setSuccessTableName] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [hasTorch, setHasTorch] = useState(false)
  const [isTorchOn, setIsTorchOn] = useState(false)

  // Clean up camera stream and animation loops
  const stopCamera = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current)
      animFrameIdRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop()
        } catch (e) {
          console.error('Error stopping track:', e)
        }
      })
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  // Start video stream
  const startCamera = useCallback(async () => {
    stopCamera()
    setPermissionState('requesting')
    setErrorMessage(null)
    setScanError(null)
    setIsSuccess(false)

    if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
      setPermissionState('unsupported')
      setErrorMessage('Camera scanning is not supported on this browser or device.')
      return
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.setAttribute('playsinline', 'true') // Required for iOS Safari
        await videoRef.current.play()
      }

      // Check torch capability
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        const capabilities = videoTrack.getCapabilities ? videoTrack.getCapabilities() : {}
        if ('torch' in capabilities) {
          setHasTorch(true)
        }
      }

      setPermissionState('granted')
    } catch (err: any) {
      console.error('Camera access error:', err)
      stopCamera()

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionState('denied')
        setErrorMessage('Camera permission is required to scan the Table QR Code.')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setPermissionState('error')
        setErrorMessage('Camera is not available on this device or browser.')
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setPermissionState('error')
        setErrorMessage('Camera is currently in use by another application.')
      } else {
        setPermissionState('error')
        setErrorMessage('Unable to access the camera. Please check your browser settings.')
      }
    }
  }, [facingMode, stopCamera])

  // Continuous frame scanning loop
  const scanFrame = useCallback(() => {
    if (!isOpen || isProcessing || isSuccess || permissionState !== 'granted') {
      animFrameIdRef.current = requestAnimationFrame(scanFrame)
      return
    }

    const video = videoRef.current
    const canvas = canvasRef.current

    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        })

        if (code && code.data) {
          const rawText = code.data
          const candidateToken = extractTableTokenFromQr(rawText)

          if (candidateToken) {
            setIsProcessing(true)
            const validation = validateTableToken(candidateToken)

            if (validation.isValid && validation.table) {
              // Valid Table QR Code
              setIsSuccess(true)
              setSuccessTableName(validation.table.tableNumber)

              // Vibrate on mobile if supported
              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try {
                  navigator.vibrate([100, 50, 100])
                } catch {}
              }

              // Stop camera and trigger callback after brief visual feedback
              setTimeout(() => {
                stopCamera()
                onScanSuccess(validation.table!)
                setIsProcessing(false)
              }, 800)
              return
            } else {
              // Invalid Table QR Code
              setScanError('Invalid Table QR Code. Please scan the QR code provided on your table.')

              if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try {
                  navigator.vibrate(200)
                } catch {}
              }

              // Allow re-scanning after delay without closing scanner
              setTimeout(() => {
                setScanError(null)
                setIsProcessing(false)
              }, 2500)
            }
          }
        }
      }
    }

    animFrameIdRef.current = requestAnimationFrame(scanFrame)
  }, [isOpen, isProcessing, isSuccess, permissionState, stopCamera, onScanSuccess])

  // Effect to manage camera lifecycle when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, startCamera, stopCamera])

  // Effect to trigger scanning loop when permission granted
  useEffect(() => {
    if (isOpen && permissionState === 'granted') {
      animFrameIdRef.current = requestAnimationFrame(scanFrame)
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [isOpen, permissionState, scanFrame])

  // Toggle torch light
  const toggleTorch = async () => {
    if (!streamRef.current) return
    const videoTrack = streamRef.current.getVideoTracks()[0]
    if (videoTrack && hasTorch) {
      try {
        const nextState = !isTorchOn
        await videoTrack.applyConstraints({
          advanced: [{ torch: nextState } as any],
        })
        setIsTorchOn(nextState)
      } catch (err) {
        console.error('Failed to toggle torch:', err)
      }
    }
  }

  // Switch facing mode (front/back camera)
  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-card shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-foreground text-base leading-tight">
                Scan Table QR
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Align camera with table QR code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary text-foreground hover:bg-secondary/80 flex items-center justify-center transition-colors"
            aria-label="Close Scanner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera View Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[360px]">
          {/* Hidden Canvas for QR Frame Extraction */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Video Stream Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />

          {/* PERMISSION STATE: REQUESTING */}
          {permissionState === 'requesting' && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
              <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="text-sm font-bold text-foreground">Requesting Camera Access...</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Please allow camera access in your browser prompt to scan your table QR code.
              </p>
            </div>
          )}

          {/* PERMISSION STATE: DENIED */}
          {permissionState === 'denied' && (
            <div className="absolute inset-0 bg-background flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
              <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shadow-inner">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h3 className="font-heading font-extrabold text-foreground text-base">
                  Camera Permission Required
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {errorMessage || 'Camera permission is required to scan the Table QR Code.'}
                </p>
              </div>
              <div className="bg-secondary/60 rounded-xl p-3 text-[11px] text-foreground/80 text-left space-y-1 max-w-xs border border-border">
                <p className="font-bold text-foreground">How to enable camera:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-muted-foreground">
                  <li>Tap the padlock or camera icon in browser address bar</li>
                  <li>Select &quot;Site Settings&quot; or &quot;Permissions&quot;</li>
                  <li>Set Camera to &quot;Allow&quot;</li>
                  <li>Refresh or tap retry below</li>
                </ol>
              </div>
              <button
                onClick={startCamera}
                className="w-full max-w-xs bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Camera Permission</span>
              </button>
            </div>
          )}

          {/* PERMISSION STATE: UNSUPPORTED OR ERROR */}
          {(permissionState === 'unsupported' || permissionState === 'error') && (
            <div className="absolute inset-0 bg-background flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
              <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center shadow-inner">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-heading font-extrabold text-foreground text-base">
                  Camera Unavailable
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {errorMessage || 'Unable to access the camera.'}
                </p>
              </div>
              <button
                onClick={startCamera}
                className="w-full max-w-xs bg-secondary text-foreground py-2.5 rounded-xl text-xs font-bold hover:bg-secondary/80 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* SCANNING RETICLE OVERLAY (WHEN GRANTED) */}
          {permissionState === 'granted' && !isSuccess && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
              {/* Darkened backdrop surrounding viewfinder */}
              <div className="relative w-60 h-60 sm:w-64 sm:h-64 rounded-3xl border-2 border-white/40 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Viewfinder Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />

                {/* Animated Laser Scanning Line */}
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_#D97706] animate-pulse top-1/2 -translate-y-1/2" />
              </div>

              {/* Instructions Subtext */}
              <p className="mt-4 text-xs font-medium text-white/90 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg text-center">
                Scan the QR code on your table
              </p>
            </div>
          )}

          {/* SCAN ERROR POPUP (INVALID QR) */}
          {scanError && (
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-rose-900/90 border border-rose-500/50 text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
              <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-rose-100 leading-tight">Invalid QR Code</p>
                <p className="text-[11px] text-rose-200/90 mt-0.5">{scanError}</p>
              </div>
            </div>
          )}

          {/* SUCCESS OVERLAY */}
          {isSuccess && (
            <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white">
                Table Verified!
              </h3>
              <p className="text-sm font-semibold text-emerald-200">
                Connected to {successTableName}
              </p>
              <p className="text-xs text-emerald-300/80">
                Opening digital menu...
              </p>
            </div>
          )}
        </div>

        {/* Footer / Controls */}
        <div className="p-4 bg-card border-t border-border flex items-center justify-between gap-3 shrink-0">
          {permissionState === 'granted' && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCameraFacing}
                className="p-2 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-xs font-semibold flex items-center gap-1.5"
                title="Switch Camera"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Flip</span>
              </button>

              {hasTorch && (
                <button
                  onClick={toggleTorch}
                  className={`p-2 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5 ${
                    isTorchOn ? 'bg-amber-500 text-white' : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                  title="Toggle Flashlight"
                >
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Flash</span>
                </button>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="ml-auto w-full sm:w-auto px-6 py-2.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}
