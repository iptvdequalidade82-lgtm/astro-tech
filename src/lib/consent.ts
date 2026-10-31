export type CookieChoice = { analytics: boolean; marketing: boolean; updatedAt: string }
export const CONSENT_KEY = 'astro-tech-consent-v1'
export function readConsent(): CookieChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || !('analytics' in parsed) || !('marketing' in parsed)) return null
    const value = parsed as CookieChoice
    return { analytics: value.analytics === true, marketing: value.marketing === true, updatedAt: value.updatedAt }
  } catch { return null }
}
export function saveConsent(analytics:boolean, marketing:boolean): CookieChoice {
  const choice = {analytics, marketing, updatedAt:new Date().toISOString()}
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(choice)) } catch { /* navegador pode bloquear armazenamento */ }
  return choice
}
let gaLoaded = false
let gaConfigured = false
const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string|undefined
export function applyAnalyticsConsent(choice: CookieChoice) {
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return
  type Gtag = (...args:unknown[])=>void
  const w = window as Window & { dataLayer?: unknown[]; gtag?:Gtag }
  if (!choice.analytics && !gaLoaded) return // modo básico: nenhum tag carregado antes do aceite
  w.dataLayer = w.dataLayer || []
  w.gtag = w.gtag || function (...args:unknown[]) { w.dataLayer!.push(args) }
  if (!gaLoaded && choice.analytics) {
    w.gtag('consent','default',{
      analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
      functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted'
    })
    const script=document.createElement('script')
    script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    script.async=true
    document.head.appendChild(script)
    w.gtag('js',new Date())
    gaLoaded=true
  }
  w.gtag('consent','update',{
    analytics_storage:choice.analytics?'granted':'denied',
    ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'
  })
  if (choice.analytics && gaLoaded && !gaConfigured) {w.gtag('config',id,{anonymize_ip:true});gaConfigured=true}
}
