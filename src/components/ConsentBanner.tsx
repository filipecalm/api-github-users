import { useEffect, useState } from 'react'
import styles from './ConsentBanner.module.css'

const STORAGE_KEY = 'cookie-consent'

type ConsentValue = 'accepted' | 'rejected'

function readConsent(): ConsentValue | null {
  const value = localStorage.getItem(STORAGE_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

function loadAnalytics(measurementId: string) {
  if (document.getElementById('ga4-script')) return

  const script = document.createElement('script')
  script.id = 'ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function ConsentBanner() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!measurementId) return

    const consent = readConsent()
    if (consent === 'accepted') {
      loadAnalytics(measurementId)
      return
    }

    if (!consent) {
      setVisible(true)
    }
  }, [measurementId])

  if (!measurementId || !visible) return null

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    loadAnalytics(measurementId!)
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setVisible(false)
  }

  return (
    <div className={styles.banner} role="dialog" aria-label="Consentimento de cookies">
      <p className={styles.text}>
        Usamos cookies de analytics (Google Analytics) apenas com o seu consentimento, conforme a
        LGPD. Você pode aceitar ou recusar.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={reject}>
          Recusar
        </button>
        <button type="button" className={styles.accept} onClick={accept}>
          Aceitar
        </button>
      </div>
    </div>
  )
}
