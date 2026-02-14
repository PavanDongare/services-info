'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface PageViewStats {
  path: string
  views: number
  percentage: number
}

interface DeviceStats {
  device_type: string
  count: number
  percentage: number
}

interface AnalyticsDashboardProps {
  className?: string
}

/**
 * Simple analytics dashboard showing traffic stats
 * For more detailed analytics, query Supabase directly
 */
export function AnalyticsDashboard({ className = '' }: AnalyticsDashboardProps) {
  const [totalViews, setTotalViews] = useState<number>(0)
  const [topPages, setTopPages] = useState<PageViewStats[]>([])
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {
    try {
      setLoading(true)
      setError(null)

      // Get total views (last 7 days)
      const { data: allViews, error: viewsError } = await supabase
        .from('page_views')
        .select('id', { count: 'exact' })
        .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

      if (viewsError) throw viewsError

      const total = allViews?.length || 0
      setTotalViews(total)

      // Get top pages
      const { data: pagesData, error: pagesError } = await supabase
        .from('page_views')
        .select('path')
        .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

      if (pagesError) throw pagesError

      const pageStats = Object.entries(
        (pagesData || []).reduce((acc, { path }) => {
          acc[path] = (acc[path] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      )
        .map(([path, count]) => ({
          path,
          views: count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)

      setTopPages(pageStats)

      // Get device stats
      const { data: deviceData, error: deviceError } = await supabase
        .from('page_views')
        .select('device_type')
        .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

      if (deviceError) throw deviceError

      const devices = Object.entries(
        (deviceData || []).reduce((acc, { device_type }) => {
          acc[device_type] = (acc[device_type] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      )
        .map(([type, count]) => ({
          device_type: type || 'unknown',
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)

      setDeviceStats(devices)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={className}>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={className}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Analytics Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2">Make sure the analytics tables are created in Supabase</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Total Views */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-600 font-semibold">Total Page Views (7 days)</p>
        <p className="text-3xl font-bold text-blue-900 mt-2">{totalViews.toLocaleString()}</p>
      </div>

      {/* Top Pages */}
      {topPages.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Top Pages</h3>
          <div className="space-y-2">
            {topPages.map((page) => (
              <div key={page.path} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{page.path}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{page.views}</p>
                  <p className="text-xs text-gray-500">{page.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device Stats */}
      {deviceStats.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Traffic by Device</h3>
          <div className="space-y-2">
            {deviceStats.map((device) => (
              <div key={device.device_type} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {device.device_type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{device.count}</p>
                  <p className="text-xs text-gray-500">{device.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {topPages.length === 0 && deviceStats.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-600">
          <p className="text-sm">No analytics data yet. Page views will appear here once traffic starts.</p>
        </div>
      )}
    </div>
  )
}
