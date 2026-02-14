'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface AnalyticsMetrics {
  totalViews: number
  uniqueCountries: number
  topPages: Array<{ path: string; views: number }>
  deviceDistribution: Array<{ device_type: string; count: number }>
  browserStats: Array<{ browser_name: string; version: string; count: number }>
  osStats: Array<{ os_name: string; version: string; count: number }>
  referrerSources: Array<{ referrer_source: string; count: number }>
  geographicData: Array<{ country: string; city: string; views: number }>
  timelineData: Array<{ date: string; views: number }>
}

const DEFAULT_DAYS = 7

export function useAnalytics(days: number = DEFAULT_DAYS) {
  const [data, setData] = useState<AnalyticsMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const queries = await Promise.all([
          // Total views
          supabase
            .from('compliance.page_views')
            .select('id', { count: 'exact' })
            .gte('timestamp', startDate.toISOString()),

          // Top pages
          supabase
            .from('compliance.page_views')
            .select('path')
            .gte('timestamp', startDate.toISOString()),

          // Device distribution
          supabase
            .from('compliance.page_views')
            .select('device_type')
            .gte('timestamp', startDate.toISOString()),

          // Browser stats
          supabase
            .from('compliance.page_views')
            .select('browser_name, browser_version')
            .gte('timestamp', startDate.toISOString())
            .not('browser_name', 'is', null),

          // OS stats
          supabase
            .from('compliance.page_views')
            .select('os_name, os_version')
            .gte('timestamp', startDate.toISOString())
            .not('os_name', 'is', null),

          // Referrer sources
          supabase
            .from('compliance.page_views')
            .select('referrer_source')
            .gte('timestamp', startDate.toISOString())
            .not('referrer_source', 'is', null),

          // Geographic data
          supabase
            .from('compliance.page_views')
            .select('country, city')
            .gte('timestamp', startDate.toISOString())
            .not('country', 'is', null),

          // Timeline data
          supabase
            .from('compliance.page_views')
            .select('timestamp')
            .gte('timestamp', startDate.toISOString()),
        ])

        // Process results
        const [
          totalViewsRes,
          topPagesRes,
          deviceRes,
          browserRes,
          osRes,
          referrerRes,
          geoRes,
          timelineRes,
        ] = queries

        // Top pages
        const pageViews = topPagesRes.data || []
        const pathCounts = pageViews.reduce(
          (acc: Record<string, number>, row) => {
            acc[row.path] = (acc[row.path] || 0) + 1
            return acc
          },
          {}
        )
        const topPages = Object.entries(pathCounts)
          .map(([path, views]) => ({ path, views: views as number }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10)

        // Device distribution
        const devices = deviceRes.data || []
        const deviceCounts = devices.reduce(
          (acc: Record<string, number>, row) => {
            acc[row.device_type] = (acc[row.device_type] || 0) + 1
            return acc
          },
          {}
        )
        const deviceDistribution = Object.entries(deviceCounts).map(
          ([device_type, count]) => ({
            device_type,
            count: count as number,
          })
        )

        // Browser stats
        const browsers = browserRes.data || []
        const browserMap = new Map<string, number>()
        browsers.forEach((row) => {
          const key = `${row.browser_name} ${row.browser_version || 'unknown'}`
          browserMap.set(key, (browserMap.get(key) || 0) + 1)
        })
        const browserStats = Array.from(browserMap.entries())
          .map(([key, count]) => {
            const [name, version] = key.split(' ')
            return { browser_name: name, version: version || 'unknown', count }
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        // OS stats
        const oses = osRes.data || []
        const osMap = new Map<string, number>()
        oses.forEach((row) => {
          const key = `${row.os_name} ${row.os_version || 'unknown'}`
          osMap.set(key, (osMap.get(key) || 0) + 1)
        })
        const osStats = Array.from(osMap.entries())
          .map(([key, count]) => {
            const [name, version] = key.split(' ')
            return { os_name: name, version: version || 'unknown', count }
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        // Referrer sources
        const referrers = referrerRes.data || []
        const referrerMap = new Map<string, number>()
        referrers.forEach((row) => {
          referrerMap.set(
            row.referrer_source,
            (referrerMap.get(row.referrer_source) || 0) + 1
          )
        })
        const referrerSources = Array.from(referrerMap.entries())
          .map(([referrer_source, count]) => ({
            referrer_source: referrer_source || 'direct',
            count,
          }))
          .sort((a, b) => b.count - a.count)

        // Geographic data
        const geoData = geoRes.data || []
        const geoMap = new Map<string, number>()
        geoData.forEach((row) => {
          const key = `${row.country}${row.city ? ',' + row.city : ''}`
          geoMap.set(key, (geoMap.get(key) || 0) + 1)
        })
        const geographicData = Array.from(geoMap.entries())
          .map(([key, views]) => {
            const [country, city] = key.split(',')
            return { country, city: city || 'Unknown', views }
          })
          .sort((a, b) => b.views - a.views)
          .slice(0, 20)

        // Timeline data (group by day)
        const timeline = timelineRes.data || []
        const dateMap = new Map<string, number>()
        timeline.forEach((row) => {
          const date = new Date(row.timestamp)
            .toISOString()
            .split('T')[0]
          dateMap.set(date, (dateMap.get(date) || 0) + 1)
        })
        const timelineData = Array.from(dateMap.entries())
          .map(([date, views]) => ({ date, views }))
          .sort((a, b) => a.date.localeCompare(b.date))

        const uniqueCountries = new Set(
          (geoRes.data || []).map((r) => r.country)
        ).size

        setData({
          totalViews: totalViewsRes.count || 0,
          uniqueCountries,
          topPages,
          deviceDistribution,
          browserStats,
          osStats,
          referrerSources,
          geographicData,
          timelineData,
        })
        setError(null)
      } catch (err) {
        console.error('Failed to fetch analytics:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [days])

  return { data, loading, error }
}
