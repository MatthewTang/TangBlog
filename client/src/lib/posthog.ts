import posthog from 'posthog-js'

export const initPostHog = () => {
  // Only initialize PostHog in production or when explicitly enabled
  const isProduction = import.meta.env.PROD
  const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
  
  if (!isProduction && !enableAnalytics) {
    console.log('PostHog analytics disabled in development')
    return
  }

  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com'

  if (!apiKey) {
    console.warn('PostHog API key not found. Analytics will not be initialized.')
    return
  }

  posthog.init(apiKey, {
    api_host: host,
    // Enable automatic pageview capture
    capture_pageview: true,
    // Enable automatic clicks, form submissions, etc.
    autocapture: true,
    // Disable session recording by default for privacy
    disable_session_recording: true,
    // Enable person profiles
    person_profiles: 'identified_only',
    // Additional privacy settings
    respect_dnt: true,
    // Capture performance metrics
    capture_performance: true,
  })

  console.log('PostHog analytics initialized')
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(eventName, properties)
  }
}

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      $pathname: path,
      $title: title || document.title,
    })
  }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(userId, properties)
  }
}

export default posthog