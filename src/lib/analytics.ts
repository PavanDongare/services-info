import { supabase } from './supabase'
import { UAParser } from 'ua-parser-js'

export interface PageView {
  path: string
  referrer: string | null
  referrer_source: string | null
  user_agent: string | null
  timestamp: string
  country: string | null
  city: string | null
  region: string | null
  timezone: string | null
  latitude: number | null
  longitude: number | null
  device_type: 'mobile' | 'tablet' | 'desktop'
  browser_name: string | null
  browser_version: string | null
  os_name: string | null
  os_version: string | null
  device_name: string | null
  screen_width: number | null
  screen_height: number | null
  language: string | null
  connection_type: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

/**
 * Track a page view event to Supabase analytics table with detailed info
 */
export async function trackPageView(path: string) {
  try {
    const referrer = document.referrer || null
    const userAgent = navigator.userAgent
    const deviceType = getDeviceType()
    const browserInfo = parseBrowser(userAgent)
    const screenDimensions = getScreenDimensions()
    const language = navigator.language || null
    const timezone = getTimezone()
    const connectionType = getConnectionType()
    const utmParams = getUTMParameters()
    const referrerSource = getReferrerSource(referrer)

    // Get detailed geolocation
    const geoData = await getGeolocationDetails()

    const pageView: PageView = {
      path,
      referrer,
      referrer_source: referrerSource,
      user_agent: userAgent,
      timestamp: new Date().toISOString(),
      country: geoData?.country_code || null,
      city: geoData?.city || null,
      region: geoData?.region || null,
      timezone,
      latitude: geoData?.latitude || null,
      longitude: geoData?.longitude || null,
      device_type: deviceType,
      browser_name: browserInfo.browserName,
      browser_version: browserInfo.browserVersion,
      os_name: browserInfo.osName,
      os_version: browserInfo.osVersion,
      device_name: browserInfo.deviceName,
      screen_width: screenDimensions.width,
      screen_height: screenDimensions.height,
      language,
      connection_type: connectionType,
      utm_source: utmParams.source,
      utm_medium: utmParams.medium,
      utm_campaign: utmParams.campaign,
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
    const userAgent = navigator.userAgent
    const browserInfo = parseBrowser(userAgent)
    const geoData = await getGeolocationDetails()
    const language = navigator.language || null

    const { error } = await supabase
      .from('analytics_events')
      .insert([{
        event_name: eventName,
        event_data: eventData || {},
        timestamp: new Date().toISOString(),
        user_agent: userAgent,
        browser_name: browserInfo.browserName,
        os_name: browserInfo.osName,
        device_type: getDeviceType(),
        country: geoData?.country_code || null,
        city: geoData?.city || null,
        language,
      }])

    if (error) {
      console.warn('Failed to track event:', error)
    }
  } catch (error) {
    console.warn('Error tracking event:', error)
  }
}

/**
 * Parse browser and OS info from user agent
 */
function parseBrowser(userAgent: string) {
  try {
    const parser = new UAParser(userAgent)
    const result = parser.getResult()

    return {
      browserName: result.browser.name || null,
      browserVersion: result.browser.version || null,
      osName: result.os.name || null,
      osVersion: result.os.version || null,
      deviceName: result.device.name || null,
    }
  } catch {
    return {
      browserName: null,
      browserVersion: null,
      osName: null,
      osVersion: null,
      deviceName: null,
    }
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
 * Get screen dimensions
 */
function getScreenDimensions() {
  if (typeof window === 'undefined') {
    return { width: null, height: null }
  }

  return {
    width: window.screen.width,
    height: window.screen.height,
  }
}

/**
 * Get user's timezone
 */
function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null
  } catch {
    return null
  }
}

/**
 * Get connection type (4g, 3g, wifi, etc.)
 */
function getConnectionType(): string | null {
  try {
    const connection = (navigator as any).connection ||
                       (navigator as any).mozConnection ||
                       (navigator as any).webkitConnection
    return connection?.effectiveType || null
  } catch {
    return null
  }
}

/**
 * Extract UTM parameters from URL
 */
function getUTMParameters() {
  if (typeof window === 'undefined') {
    return { source: null, medium: null, campaign: null }
  }

  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
  }
}

/**
 * Determine referrer source (google, facebook, direct, etc.)
 */
function getReferrerSource(referrer: string | null): string | null {
  if (!referrer) return 'direct'

  const referrerUrl = new URL(referrer)
  const domain = referrerUrl.hostname.toLowerCase()

  if (domain.includes('google')) return 'google'
  if (domain.includes('facebook') || domain.includes('fb.com')) return 'facebook'
  if (domain.includes('twitter') || domain.includes('x.com')) return 'twitter'
  if (domain.includes('linkedin')) return 'linkedin'
  if (domain.includes('instagram')) return 'instagram'
  if (domain.includes('reddit')) return 'reddit'
  if (domain.includes('bing')) return 'bing'
  if (domain.includes('yahoo')) return 'yahoo'
  if (domain.includes('duckduckgo')) return 'duckduckgo'

  return 'referral'
}

/**
 * Get detailed geolocation from IP (using free API)
 * Returns country, city, region, timezone, and approximate coordinates
 */
interface GeolocationData {
  country_code: string | null
  city: string | null
  region: string | null
  latitude: number | null
  longitude: number | null
}

async function getGeolocationDetails(): Promise<GeolocationData> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000),
    })

    if (!response.ok) {
      return {
        country_code: null,
        city: null,
        region: null,
        latitude: null,
        longitude: null,
      }
    }

    const data = await response.json()
    return {
      country_code: data.country_code || null,
      city: data.city || null,
      region: data.region || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
    }
  } catch {
    return {
      country_code: null,
      city: null,
      region: null,
      latitude: null,
      longitude: null,
    }
  }
}
