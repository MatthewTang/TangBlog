# PostHog Analytics Integration

This document describes the PostHog analytics implementation for TangBlog.

## Overview

PostHog has been integrated to track user interactions and provide insights into website usage. The implementation includes:

- Automatic page view tracking
- Blog post interaction tracking
- Custom event tracking for key user actions
- Privacy-compliant configuration
- Environment-based configuration

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```bash
# PostHog Configuration
VITE_POSTHOG_API_KEY=your_posthog_api_key_here
VITE_POSTHOG_HOST=https://app.posthog.com

# Set to 'true' to enable analytics in development mode
VITE_ENABLE_ANALYTICS=false
```

### Getting Your API Key

1. Sign up for PostHog at https://app.posthog.com
2. Create a new project or use an existing one
3. Go to Project Settings > Project variables
4. Copy your Project API Key
5. Set it as `VITE_POSTHOG_API_KEY` in your `.env` file

## Tracked Events

### Automatic Events

- **Page Views**: Automatically tracked for all route changes
- **Clicks**: Auto-captured on interactive elements
- **Form Submissions**: Auto-captured when forms are submitted

### Custom Events

- **`blog_post_viewed`**: Triggered when a user views a blog post
  - Properties: `slug`, `title`, `date`, `tags`
  
- **`blog_link_clicked`**: Triggered when a user clicks a blog link from the home page
  - Properties: `slug`, `title`, `source` (title/read_more), `location`

## Privacy & Compliance

The implementation includes privacy-friendly defaults:

- Session recording is disabled by default
- Respects "Do Not Track" browser settings
- Only tracks identified users for person profiles
- Performance metrics are captured for optimization

## Development

### Testing

In development mode, PostHog is disabled by default unless `VITE_ENABLE_ANALYTICS=true` is set in your environment.

To test the integration:

1. Set `VITE_ENABLE_ANALYTICS=true` in your `.env` file
2. Add a test API key (or use a development PostHog project)
3. Run `npm run dev`
4. Open browser developer tools and check the console for PostHog messages
5. Navigate around the site and verify events are being tracked

### Production

In production, PostHog will automatically initialize if `VITE_POSTHOG_API_KEY` is present, regardless of the `VITE_ENABLE_ANALYTICS` setting.

## Files Modified

- `client/src/lib/posthog.ts` - PostHog configuration and utility functions
- `client/src/components/PostHogProvider.tsx` - React provider for PostHog
- `client/src/App.tsx` - Added PostHogProvider to app
- `client/src/pages/blog-post.tsx` - Added blog post view tracking
- `client/src/components/sections/blog.tsx` - Added blog link click tracking
- `package.json` - Added posthog-js dependency
- `.gitignore` - Added .env files to prevent committing secrets
- `.env.example` - Template for environment configuration

## Troubleshooting

### PostHog Not Initializing

1. Check that `VITE_POSTHOG_API_KEY` is set correctly
2. Verify the API key is valid in your PostHog dashboard
3. Check browser console for error messages
4. Ensure you're in production mode or have `VITE_ENABLE_ANALYTICS=true` set

### Events Not Showing

1. Verify PostHog is initialized (check console logs)
2. Check the PostHog dashboard for recent events
3. Ensure your PostHog project is correctly configured
4. Check browser network tab for PostHog API requests