# Analytics Setup Guide

This project includes built-in analytics tracking to monitor traffic and user behavior. The analytics data is stored in Supabase.

## Quick Start

### 1. Create Analytics Tables in Supabase

Go to your Supabase dashboard and run the following SQL in the SQL editor:

```sql
-- Create page_views table
CREATE TABLE IF NOT EXISTS public.page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country TEXT,
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_events table for custom events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_page_views_timestamp ON public.page_views(timestamp);
CREATE INDEX idx_page_views_path ON public.page_views(path);
CREATE INDEX idx_analytics_events_timestamp ON public.analytics_events(timestamp);
CREATE INDEX idx_analytics_events_name ON public.analytics_events(event_name);

-- Enable row level security (optional but recommended)
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users (anonymous is OK too)
CREATE POLICY "Allow public inserts" ON public.page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON public.analytics_events
  FOR INSERT WITH CHECK (true);
```

### 2. That's it!

The analytics tracker is now active. It will automatically:
- Track all page views
- Capture referrer information
- Detect device type (mobile/tablet/desktop)
- Get approximate geolocation from IP
- Store all data in Supabase

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
FROM public.page_views
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY path
ORDER BY views DESC;

-- Top referrers
SELECT
  referrer,
  COUNT(*) as count
FROM public.page_views
WHERE referrer IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY referrer
ORDER BY count DESC
LIMIT 10;

-- Device distribution
SELECT
  device_type,
  COUNT(*) as count
FROM public.page_views
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY device_type;

-- Geographic distribution
SELECT
  country,
  COUNT(*) as views
FROM public.page_views
WHERE country IS NOT NULL
  AND timestamp > NOW() - INTERVAL '7 days'
GROUP BY country
ORDER BY views DESC
LIMIT 20;

-- Custom events
SELECT
  event_name,
  COUNT(*) as count,
  timestamp
FROM public.analytics_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY event_name, timestamp
ORDER BY timestamp DESC;
```

## Environment Variables

Make sure your `.env.local` has:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

(These should already be configured in your project)

## Data Privacy

- Analytics data is stored locally in your Supabase instance
- No data is sent to third-party services
- Country is derived from IP using a free geolocation service
- User agents are stored but not used for tracking individual users
- No cookies or persistent identifiers are used

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
