import { useState } from 'react'
import type { NavProps } from '../types'
import { produce } from '../data'

type ScanState = 'camera' | 'preview' | 'analyzing'

export default function CropScanScreen({ navigate }: NavProps) {
  const [state, setState] = useState<ScanState>('camera')
  const [flash, setFlash] = useState(false)

  const handleCapture = () => {
    setState('preview')
  }

  const handleAnalyze = () => {
    setState('analyzing')
    setTimeout(() => navigate('qualityAnalysis'), 1800)
  }

  return (
    <div className="flex flex-col h-full bg-stone-950">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-3">
        <button
          onClick={() => navigate('sellNow')}
          className="text-white font-semibold text-sm flex items-center gap-1"
        >
          ✕ Cancel
        </button>
        <p className="text-white font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Scan Crop Quality
        </p>
        <button
          onClick={() => setFlash((f) => !f)}
          className={`w-9 h-9 rounded-full flex items-center justify-center ${flash ? 'bg-amber-400' : 'bg-stone-800'}`}
        >
          <svg viewBox="0 0 24 24" className={`w-5 h-5 ${flash ? 'text-stone-900' : 'text-stone-400'}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </button>
      </div>

      {/* Camera / preview area */}
      <div className="flex-1 relative flex flex-col items-center justify-center px-6">
        {state === 'camera' && (
          <>
            {/* Simulated camera view */}
            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-stone-900 relative mb-6">
              {/* Green corner frame guides */}
              {[
                'top-4 left-4 border-t-4 border-l-4',
                'top-4 right-4 border-t-4 border-r-4',
                'bottom-4 left-4 border-b-4 border-l-4',
                'bottom-4 right-4 border-b-4 border-r-4',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 border-green-400 rounded-sm ${cls}`} />
              ))}

              {/* Scan line animation */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-green-400/60 animate-pulse" />
              </div>

              {/* Crop detection hint */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/80 text-xs font-semibold">Detecting crop…</p>
              </div>
            </div>

            <div className="bg-stone-900/80 rounded-2xl px-5 py-3 mb-4 text-center">
              <p className="text-white text-sm font-semibold">Place the vegetables inside the frame</p>
              <p className="text-stone-400 text-xs mt-1">Good lighting gives better results</p>
            </div>
          </>
        )}

        {state === 'preview' && (
          <>
            <div className="w-full aspect-square rounded-3xl overflow-hidden mb-6 relative">
              <img src={produce.photo} alt="Captured crop" className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                ✓ Captured
              </div>
            </div>
            <p className="text-stone-400 text-sm text-center mb-2">
              Review your photo before analysis
            </p>
          </>
        )}

        {state === 'analyzing' && (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center mb-6 shadow-xl">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-white text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Analysing…
            </p>
            <p className="text-stone-400 text-sm">AI is checking colour, freshness and quality</p>
            <div className="mt-6 space-y-2 w-full max-w-xs">
              {['Checking colour…', 'Detecting freshness…', 'Analysing surface…'].map((step, i) => (
                <div key={step} className="flex items-center gap-3 bg-stone-900/60 rounded-xl px-4 py-2.5">
                  <div className={`w-4 h-4 rounded-full border-2 border-green-400 ${i === 0 ? 'bg-green-400' : ''}`} />
                  <p className="text-stone-300 text-sm font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      {state !== 'analyzing' && (
        <div className="px-6 pb-12 pt-2">
          {state === 'camera' ? (
            <div className="flex items-center justify-between">
              {/* Gallery */}
              <button
                onClick={() => navigate('qualityAnalysis')}
                className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>

              {/* Capture button */}
              <button
                onClick={handleCapture}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-white border-4 border-stone-300" />
              </button>

              {/* Flip cam placeholder */}
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-3.35" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleAnalyze}
                className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-md"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                🔍 Analyse Quality →
              </button>
              <button
                onClick={() => setState('camera')}
                className="w-full py-3 bg-stone-800 text-stone-300 rounded-2xl font-semibold text-sm"
              >
                Retake Photo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
