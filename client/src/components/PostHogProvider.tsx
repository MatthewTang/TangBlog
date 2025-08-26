import { createContext, useContext, useEffect, ReactNode } from 'react'
import { initPostHog, trackPageView } from '@/lib/posthog'
import { useLocation } from 'wouter'

interface PostHogContextType {
  isInitialized: boolean
}

const PostHogContext = createContext<PostHogContextType>({ isInitialized: false })

export const usePostHog = () => useContext(PostHogContext)

interface PostHogProviderProps {
  children: ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const [location] = useLocation()

  useEffect(() => {
    // Initialize PostHog when the provider mounts
    initPostHog()
  }, [])

  useEffect(() => {
    // Track page views when location changes
    trackPageView(location)
  }, [location])

  return (
    <PostHogContext.Provider value={{ isInitialized: true }}>
      {children}
    </PostHogContext.Provider>
  )
}