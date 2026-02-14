import { supabase } from './supabase'

export interface PageView {
  path: string
  referrer: string | null
  user_agent: string | null
  timestamp: string
  country: string | null
  device_type: 'mobile' | 'tablet' | 'desktop'
}

/**
 * Track a page view event to Supabase analytics table
 */
export async function trackPageView(path: string) {
  try {
    const referrer = document.referrer || null
    const userAgent = navigator.userAgent
    const deviceType = getDeviceType()

    // Try to get country from IP (basic implementation)
    const country = await getCountryFromIP()

    const pageView: PageView = {
      path,
      referrer,
      user_agent: userAgent,
      timestamp: new Date().toISOString(),
      country,
      device_type: deviceType,
    }

    const { error } = await supabase
      .from('page_views')
      .insert([pageView])

    if (error) {
      console.warn('Failed to track page view:', error)
    }
  } catch (error) {
    console.warn('Error tracking page view:', error)
  }
}

/**
 * Track custom events (e.g., button clicks, form submissions)
 */
export async function trackEvent(eventName: string, eventData?: Record<string, any>) {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert([{
        event_name: eventName,
        event_data: eventData || {},
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
      }])

    if (error) {
      console.warn('Failed to track event:', error)
    }
  } catch (error) {
    console.warn('Error tracking event:', error)
  }
}

/**
 * Get device type based on viewport width
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Get approximate country from IP (using a free IP geolocation API)
 * Falls back gracefully if service unavailable
 */
async function getCountryFromIP(): Promise<string | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(2000),
    })
    if (!response.ok) return null

    const data = await response.json()
    return data.country_code || null
  } catch {
    return null
  }
}
