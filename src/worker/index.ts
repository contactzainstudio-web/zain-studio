import { Hono } from 'hono'

// Edge worker for Cloudflare Pages.
// Static assets (the built React SPA) are served by Pages via env.ASSETS.
// This worker only intercepts /api/* and provides security headers.
type Bindings = { ASSETS: { fetch: (req: Request) => Promise<Response> } }

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/health', (c) => c.json({ ok: true, studio: 'Zain Studio', ts: Date.now() }))

// Everything else -> static SPA assets with hardened headers
app.all('*', async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw)
  const headers = new Headers(res.headers)
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('X-Frame-Options', 'SAMEORIGIN')
  return new Response(res.body, { status: res.status, headers })
})

export default app
