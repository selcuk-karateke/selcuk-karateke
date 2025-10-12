# Instagram Business API Implementation

## API Endpoints Setup

### 1. Basic Account Information
```typescript
// Get Instagram Business Account Info
GET /{instagram-business-account-id}
?fields=id,username,account_type,media_count,followers_count,follows_count,name,profile_picture_url,biography,website
```

### 2. Content Creation and Management
```typescript
// Create Instagram Post
POST /{instagram-business-account-id}/media
{
  "image_url": "https://example.com/image.jpg",
  "caption": "Your caption here",
  "access_token": "your_access_token"
}

// Create Instagram Reel
POST /{instagram-business-account-id}/media
{
  "video_url": "https://example.com/video.mp4",
  "caption": "Your reel caption",
  "media_type": "REELS",
  "access_token": "your_access_token"
}

// Publish Media
POST /{instagram-business-account-id}/media_publish
{
  "creation_id": "media_creation_id",
  "access_token": "your_access_token"
}

// Get Instagram Posts
GET /{instagram-business-account-id}/media
?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count
```

### 3. Insights and Analytics
```typescript
// Get Account Insights
GET /{instagram-business-account-id}/insights
?metric=impressions,reach,follower_count,email_contacts,phone_call_clicks,text_message_clicks,get_directions_clicks,website_clicks
&period=day

// Get Post Insights
GET /{media-id}/insights
?metric=impressions,reach,likes,comments,shares,saves
```

## Implementation in Next.js

### 1. API Routes

```typescript
// pages/api/instagram/account.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}?fields=id,username,account_type,media_count,followers_count,follows_count,name,profile_picture_url,biography,website&access_token=${accessToken}`
    )
    
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram account data' })
  }
}
```

```typescript
// pages/api/instagram/posts.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`
    )
    
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram posts' })
  }
}
```

```typescript
// pages/api/instagram/insights.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/insights?metric=impressions,reach,follower_count,email_contacts,phone_call_clicks,text_message_clicks,get_directions_clicks,website_clicks&period=day&access_token=${accessToken}`
    )
    
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram insights' })
  }
}
```

### 2. React Components

```typescript
// components/InstagramAccount.tsx
import { useState, useEffect } from 'react'

interface InstagramAccount {
  id: string
  username: string
  account_type: string
  media_count: number
  followers_count: number
  follows_count: number
  name: string
  profile_picture_url: string
  biography: string
  website: string
}

export default function InstagramAccount() {
  const [account, setAccount] = useState<InstagramAccount | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/instagram/account')
      .then(res => res.json())
      .then(data => {
        setAccount(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching Instagram account:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading Instagram account...</div>
  if (!account) return <div>Failed to load Instagram account</div>

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4">
        <img
          src={account.profile_picture_url}
          alt={account.username}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold">{account.name}</h3>
          <p className="text-gray-600">@{account.username}</p>
          <p className="text-sm text-gray-500">{account.followers_count} followers</p>
        </div>
      </div>
      {account.biography && (
        <p className="mt-4 text-gray-700">{account.biography}</p>
      )}
    </div>
  )
}
```

```typescript
// components/InstagramPosts.tsx
import { useState, useEffect } from 'react'

interface InstagramPost {
  id: string
  caption: string
  media_type: string
  media_url: string
  thumbnail_url: string
  permalink: string
  timestamp: string
  like_count: number
  comments_count: number
}

export default function InstagramPosts() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/instagram/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || [])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching Instagram posts:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading Instagram posts...</div>
  if (!posts.length) return <div>No Instagram posts found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
            alt={post.caption}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-2">
              {new Date(post.timestamp).toLocaleDateString()}
            </p>
            {post.caption && (
              <p className="text-gray-700 mb-3 line-clamp-3">{post.caption}</p>
            )}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{post.like_count} likes</span>
              <span>{post.comments_count} comments</span>
            </div>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-blue-600 hover:text-blue-800"
            >
              View on Instagram
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 3. Environment Variables

```env
# .env.local
INSTAGRAM_ACCESS_TOKEN=your_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id_here
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
```

### 4. OAuth Flow Implementation

```typescript
// pages/api/auth/instagram.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query
  
  if (!code) {
    // Redirect to Instagram OAuth
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=instagram_basic,instagram_manage_insights&response_type=code`
    res.redirect(authUrl)
    return
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI!,
        code: code as string,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    // Store access token securely
    // In production, use a secure session or database
    
    res.redirect('/dashboard')
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with Instagram' })
  }
}
```

## Testing Checklist

### Before App Review Submission
- [ ] Instagram Business Account erstellt
- [ ] Facebook App konfiguriert
- [ ] OAuth Flow implementiert
- [ ] API Endpoints getestet
- [ ] Error Handling implementiert
- [ ] Rate Limiting berücksichtigt
- [ ] Security Measures implementiert
- [ ] Screen Recordings erstellt
- [ ] Usage Descriptions geschrieben

### API Testing
- [ ] Account Information abrufen
- [ ] Posts und Stories abrufen
- [ ] Insights und Analytics abrufen
- [ ] Error Cases testen
- [ ] Rate Limiting testen
- [ ] Authentication Flow testen

## Security Considerations

1. **Access Token Security**
   - Server-side storage
   - Environment variables
   - Token rotation

2. **Rate Limiting**
   - Implement caching
   - Respect API limits
   - Handle 429 errors

3. **Error Handling**
   - Graceful degradation
   - User-friendly messages
   - Logging and monitoring

4. **Data Privacy**
   - GDPR compliance
   - Data minimization
   - User consent
