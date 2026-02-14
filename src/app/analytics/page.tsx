'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useAnalytics } from '@/hooks/useAnalytics'

const COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
]

export default function AnalyticsDashboard() {
  const [days, setDays] = useState(7)
  const { data, loading, error } = useAnalytics(days)

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-lg">
        <h2 className="font-bold">Error Loading Analytics</h2>
        <p>{error}</p>
        <p className="text-sm mt-2">
          Make sure the compliance schema tables exist and have data.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Analytics Dashboard
          </h1>
          <div className="flex gap-4 items-center">
            <label className="text-gray-300">
              Last
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="ml-2 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value={1}>1 day</option>
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : data ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-gray-400 text-sm font-semibold mb-2">
                  Total Page Views
                </div>
                <div className="text-4xl font-bold text-white">
                  {data.totalViews.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-gray-400 text-sm font-semibold mb-2">
                  Unique Countries
                </div>
                <div className="text-4xl font-bold text-white">
                  {data.uniqueCountries}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-gray-400 text-sm font-semibold mb-2">
                  Top Page Views
                </div>
                <div className="text-4xl font-bold text-white">
                  {data.topPages[0]?.views || 0}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {data.topPages[0]?.path || 'N/A'}
                </div>
              </div>
            </div>

            {/* Timeline Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Page Views Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #444',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Device Distribution */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  Device Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.deviceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.deviceDistribution.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #444',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value: number, name: string, props: any) => [
                        `${value}`,
                        props.payload.device_type,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Referrer Sources */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  Traffic Sources
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.referrerSources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="referrer_source" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #444',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Pages */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Top Pages</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-4 text-gray-400 font-semibold">
                          Page
                        </th>
                        <th className="text-right py-2 px-4 text-gray-400 font-semibold">
                          Views
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topPages.map((page) => (
                        <tr key={page.path} className="border-b border-gray-700">
                          <td className="py-2 px-4 text-gray-300 truncate">
                            {page.path}
                          </td>
                          <td className="text-right py-2 px-4 text-white font-medium">
                            {page.views}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Browsers */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Top Browsers</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-4 text-gray-400 font-semibold">
                          Browser
                        </th>
                        <th className="text-right py-2 px-4 text-gray-400 font-semibold">
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.browserStats.map((browser) => (
                        <tr
                          key={`${browser.browser_name}-${browser.version}`}
                          className="border-b border-gray-700"
                        >
                          <td className="py-2 px-4 text-gray-300">
                            {browser.browser_name} {browser.version}
                          </td>
                          <td className="text-right py-2 px-4 text-white font-medium">
                            {browser.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Operating Systems */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  Operating Systems
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-4 text-gray-400 font-semibold">
                          OS
                        </th>
                        <th className="text-right py-2 px-4 text-gray-400 font-semibold">
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.osStats.map((os) => (
                        <tr
                          key={`${os.os_name}-${os.version}`}
                          className="border-b border-gray-700"
                        >
                          <td className="py-2 px-4 text-gray-300">
                            {os.os_name} {os.version}
                          </td>
                          <td className="text-right py-2 px-4 text-white font-medium">
                            {os.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Geographic Data */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  Top Locations
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-4 text-gray-400 font-semibold">
                          Location
                        </th>
                        <th className="text-right py-2 px-4 text-gray-400 font-semibold">
                          Views
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.geographicData.map((geo) => (
                        <tr
                          key={`${geo.country}-${geo.city}`}
                          className="border-b border-gray-700"
                        >
                          <td className="py-2 px-4 text-gray-300">
                            {geo.city}, {geo.country}
                          </td>
                          <td className="text-right py-2 px-4 text-white font-medium">
                            {geo.views}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
            <p className="text-gray-400">No analytics data available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
