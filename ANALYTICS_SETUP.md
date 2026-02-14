# Analytics Setup Guide

This project includes built-in analytics tracking to monitor traffic and user behavior. The analytics data is stored in Supabase.

## Quick Start

### 1. Create Analytics Tables in Supabase

Go to your Supabase dashboard and run the following SQL in the SQL editor:

**FIRST, clean up old public tables (if you ran the previous version):**

```sql
-- Drop public tables if they exist
DROP TABLE IF EXISTS public.analytics_events CASCADE;
DROP TABLE IF EXISTS public.page_views CASCADE;
```

**THEN, create the compliance schema tables:**

```sql
-- Create compliance schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS compliance;

-- Create page_views table with detailed tracking
CREATE TABLE IF NOT EXISTS compliance.page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  referrer_source TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Location & Geography
  country TEXT,
  city TEXT,
  region TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT,

  -- Device Information
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  device_name TEXT,
  browser_name TEXT,
  browser_version TEXT,
  os_name TEXT,
  os_version TEXT,
  screen_width INTEGER,
  screen_height INTEGER,

  -- Network & Language
  language TEXT,
  connection_type TEXT,

  -- Campaign Tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_events table for custom events
CREATE TABLE IF NOT EXISTS compliance.analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_data JSONB,
  user_agent TEXT,

  -- Device & Location
  device_type TEXT,
  browser_name TEXT,
  os_name TEXT,
  country TEXT,
  city TEXT,
  language TEXT,

  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_page_views_timestamp ON compliance.page_views(timestamp);
CREATE INDEX idx_page_views_path ON compliance.page_views(path);
CREATE INDEX idx_page_views_country ON compliance.page_views(country);
CREATE INDEX idx_page_views_device_type ON compliance.page_views(device_type);
CREATE INDEX idx_page_views_browser ON compliance.page_views(browser_name);
CREATE INDEX idx_page_views_os ON compliance.page_views(os_name);
CREATE INDEX idx_page_views_referrer_source ON compliance.page_views(referrer_source);
CREATE INDEX idx_analytics_events_timestamp ON compliance.analytics_events(timestamp);
CREATE INDEX idx_analytics_events_name ON compliance.analytics_events(event_name);
CREATE INDEX idx_analytics_events_country ON compliance.analytics_events(country);

-- Enable row level security (optional but recommended)
ALTER TABLE compliance.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users (anonymous is OK too)
CREATE POLICY "Allow public inserts" ON compliance.page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON compliance.analytics_events
  FOR INSERT WITH CHECK (true);
```

### 2. That's it!

The analytics tracker is now active. It will automatically track all page views with:

**Device & Browser:**
- Browser name and version
- Operating system and version
- Device name/model
- Device type (mobile/tablet/desktop)
- Screen resolution

**Location:**
- Country, city, and region
- Latitude/longitude (approximate)
- Timezone

**Traffic Source:**
- Referrer URL and source (Google, Facebook, direct, etc.)
- UTM parameters (utm_source, utm_medium, utm_campaign)

**Network & Language:**
- User's language preference
- Connection type (4G, WiFi, etc.)

**User Agent & Custom Data:**
- Full user agent string
- Custom event data tracking

## Using Analytics

### Automatic Page View Tracking

Page views are automatically tracked when users navigate. No additional code needed.

### Custom Event Tracking

To track custom events (e.g., button clicks, form submissions):

```typescript
import { trackEvent } from '@/lib/analytics'

// In your component
trackEvent('cta_clicked', {
  button_name: 'pricing_signup',
  location: 'hero_section'
})
```

### Viewing Analytics

Query your analytics data directly in Supabase:

```sql
-- Page views by path (last 7 days)
SELECT
  path,
  COUNT(*) as views,
  COUNT(DISTINCT country) as unique_countries
FROM compliance.page_views
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY path
ORDER BY views DESC;

-- Top referrer sources (Google, Facebook, direct, etc.)
SELECT
  referrer_source,
  COUNT(*) as count
FROM compliance.page_views
WHERE referrer_source IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY referrer_source
ORDER BY count DESC;

-- Browser usage statistics
SELECT
  browser_name,
  browser_version,
  COUNT(*) as count
FROM compliance.page_views
WHERE browser_name IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY browser_name, browser_version
ORDER BY count DESC;

-- Operating system distribution
SELECT
  os_name,
  os_version,
  COUNT(*) as count
FROM compliance.page_views
WHERE os_name IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY os_name, os_version
ORDER BY count DESC;

-- Device distribution (mobile, tablet, desktop)
SELECT
  device_type,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM compliance.page_views
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY device_type;

-- Screen resolution popularity
SELECT
  CONCAT(screen_width, 'x', screen_height) as resolution,
  COUNT(*) as count
FROM compliance.page_views
WHERE screen_width IS NOT NULL
  AND screen_height IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY screen_width, screen_height
ORDER BY count DESC
LIMIT 10;

-- Geographic distribution (top 20 countries)
SELECT
  country,
  city,
  COUNT(*) as views
FROM compliance.page_views
WHERE country IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY country, city
ORDER BY views DESC
LIMIT 20;

-- Traffic by timezone
SELECT
  timezone,
  COUNT(*) as views
FROM compliance.page_views
WHERE timezone IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY timezone
ORDER BY views DESC
LIMIT 10;

-- UTM campaign performance
SELECT
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(*) as views
FROM compliance.page_views
WHERE utm_source IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY views DESC;

-- Language distribution
SELECT
  language,
  COUNT(*) as views
FROM compliance.page_views
WHERE language IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY language
ORDER BY views DESC;

-- Connection type (4G, WiFi, etc.)
SELECT
  connection_type,
  COUNT(*) as views
FROM compliance.page_views
WHERE connection_type IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY connection_type
ORDER BY views DESC;

-- Custom events by type
SELECT
  event_name,
  COUNT(*) as count
FROM compliance.analytics_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY event_name
ORDER BY count DESC;

-- Events by browser and OS
SELECT
  event_name,
  browser_name,
  os_name,
  COUNT(*) as count
FROM compliance.analytics_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY event_name, browser_name, os_name
ORDER BY count DESC;
```

## Environment Variables

Make sure your `.env.local` has:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

(These should already be configured in your project)

## Data Privacy

- **Local Storage:** All analytics data is stored exclusively in your Supabase instance
- **No External Tracking:** No data is sent to Google Analytics, Facebook, or any third-party services
- **IP Geolocation:** Country, city, and coordinates are derived from IP using a free geolocation API (ipapi.co)
- **No Personal Data:** No names, emails, or personally identifiable information is collected
- **No Persistent Identifiers:** Analytics do not use cookies, localStorage, or tracking IDs to identify individual users
- **GDPR/CCPA Compliant:** The system respects user privacy by design - no persistent tracking across sessions
- **Device Fingerprinting:** While user agent and device info are stored, they cannot be used to identify individual users across sessions

## Disabling Analytics

To temporarily disable analytics tracking, comment out the `<AnalyticsTracker />` component in `src/app/layout.tsx`.

## Troubleshooting

**No data appearing in Supabase?**

1. Check that the tables were created successfully
2. Check browser console for any errors
3. Verify Supabase environment variables are correct
4. Make sure RLS policies allow inserts (see SQL above)

**Data not being inserted?**

1. Verify Supabase tables exist
2. Check browser network tab for failed requests
3. Review RLS policies - they should allow public inserts
