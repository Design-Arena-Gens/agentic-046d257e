# 🎬 AI YouTube Video Automation Agent

AI-powered workflow that converts a plain text script into a production-ready YouTube package with voiceover, storyboard, music, subtitles, SEO metadata, thumbnail brief, and optional auto-upload.

## ✨ Highlights

- Modern Next.js 14 + React 18 single-page control center
- Serverless pipeline orchestrator hitting AI providers when keys are present and falling back to demo assets otherwise
- Visual timeline of every stage with detailed status messaging
- Downloadable asset links (voiceover, subtitles, assembled video, thumbnail) and copy-ready SEO bundle
- Optional scheduled YouTube upload via Data API (using OAuth refresh token credentials)

## 🛠 Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS for styling
- Framer Motion for lightweight staging animations
- OpenAI, ElevenLabs, Pexels, Soundraw/Beatoven, Recraft/Midjourney, and YouTube API integrations with graceful fallbacks

## 🚀 Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Environment Variables

Create a `.env.local` file if you want live integrations instead of demo assets.

```
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
PEXELS_API_KEY=...
BEATOVEN_API_KEY=...        # or SOUNDRAW_API_KEY
RECRAFT_API_KEY=...         # or MIDJOURNEY_API_KEY (via proxy)
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REFRESH_TOKEN=...
```

Leaving any of these blank will trigger high-quality defaults so the UI keeps working out-of-the-box.

## 🧠 Pipeline Overview

1. **Script Analysis** – identify tone, topics, key beats, CTA (OpenAI fallback included)
2. **Voiceover** – synthesize or reuse sample narration, returning playback URL & timing
3. **Visuals** – fetch storyboard stills/B-roll suggestions from Pexels (or curated set)
4. **Music** – request background bed tailored to tone (or licensed sample)
5. **Subtitles** – auto-split script into cues and supply VTT download link
6. **Thumbnail** – craft AI prompt and preview asset
7. **SEO** – compose title, description, and tags ready for upload
8. **Assembly** – stitch references into an export bundle (demo MP4 when offline)
9. **Upload** – push straight to YouTube or leave queued for manual handling

## 📦 Production Build

```bash
npm run build
npm start
```

## 📄 Deployment

The project is Vercel-ready. Set environment variables in the Vercel dashboard, then deploy:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-046d257e
```

## ✅ Status

- `npm run build` ✅
- TypeScript strict enough for production with helpful fallbacks

Feel free to extend the `lib/integrations` directory with additional providers (e.g., Runway ML for video generation, Descript for overdubs) or plug in custom automations.
