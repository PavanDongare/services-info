'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

/**
 * Analytics tracker component that automatically tracks page views
 * Place this in your root layout to enable analytics
 */
export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view whenever pathname changes
    trackPageView(pathname)
  }, [pathname])

  return null
}
