# Troubleshooting

Common problems and how to fix them, in plain English.

---

## Setup Problems

### "command not found: node" or "command not found: npm"

**What it means:** Node.js isn't installed on your computer.

**Fix:** Go to [nodejs.org](https://nodejs.org), download the installer (click the big green button), run it, and restart your terminal.

### "command not found: git"

**What it means:** Git isn't installed.

**Fix:**
- **Mac:** Open Terminal and type `xcode-select --install`, then click Install
- **Windows:** Download from [git-scm.com](https://git-scm.com)

### "npm install" takes forever or fails

**What it means:** Your internet connection is slow, or something went wrong downloading packages.

**Fix:** Try running `npm install` again. If it keeps failing, try:
```
npm cache clean --force
npm install
```

---

## Running the Site

### The site shows a blank white page

**What it means:** Something crashed when building the page.

**Fix:**
1. Open your browser's developer tools (right-click → Inspect → Console tab)
2. Look for red error messages
3. Tell your AI assistant what the error says — it'll fix it

### "Error: ADMIN_SECRET not set" or "ADMIN_PASSWORD not set"

**What it means:** The admin panel needs a password, but you haven't set one yet.

**Fix:**
1. Copy `.env.example` to a new file called `.env.local`
2. Change `ADMIN_PASSWORD=change-me-to-a-strong-password` to an actual password
3. Change `ADMIN_SECRET=change-me-to-a-random-string` to any long random text
4. Restart the dev server (`Ctrl + C` to stop, then `npm run dev` again)

### "Module not found" errors

**What it means:** The project's packages aren't installed.

**Fix:** Run `npm install` and try again.

### The site is stuck on "Loading..."

**What it means:** The content file is missing or corrupted.

**Fix:** Delete `content.json` (if it exists) and restart the dev server. It'll recreate itself with defaults.

---

## Content & Customization

### My changes aren't showing up

**Possible causes:**
1. **The dev server isn't running.** Run `npm run dev`
2. **Browser cache.** Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
3. **ISR cache.** Content changes are cached for 60 seconds. Wait a minute or restart the dev server.

### Videos aren't playing / show a gray box

**What it means:** The video URL or ID might be wrong.

**Fix:** Make sure your video URLs look like one of these:
- YouTube: `https://youtu.be/VIDEO_ID` or `https://youtube.com/watch?v=VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`
- Instagram Reels: the full Instagram URL

### Images aren't loading

**Possible causes:**
1. **The URL is wrong or the image was deleted.** Try opening the image URL directly in your browser.
2. **The image domain isn't allowed.** Add it to the `images.remotePatterns` in `next.config.ts`. Or tell your AI assistant — it'll handle this.

### The admin panel won't let me log in

**Fix:**
1. Make sure `ADMIN_PASSWORD` is set in `.env.local`
2. Make sure `ADMIN_SECRET` is set (any long random string)
3. Restart the dev server after changing `.env.local`

---

## Deployment

### "Build failed" on Vercel

**What it means:** Something in the code doesn't compile.

**Fix:**
1. Run `npm run build` on your computer first to see the error
2. Fix the error (or tell your AI assistant about it)
3. Push the fix and Vercel will rebuild automatically

### "Environment variable not set" on Vercel

**Fix:** Go to your Vercel project → Settings → Environment Variables, and add:
- `ADMIN_PASSWORD` — your admin password
- `ADMIN_SECRET` — a long random string (at least 32 characters)

### My live site still shows old content

**What it means:** Vercel cached the old version.

**Fix:** Go to your Vercel dashboard → Deployments → click the three dots on the latest deployment → Redeploy.

---

## Still Stuck?

1. **Tell your AI assistant.** Copy the error message and paste it into Claude Code, Codex, or Cursor. It can usually fix it.
2. **Check the GitHub Issues.** Someone else might have hit the same problem.
3. **Open an issue.** Describe what you were doing, what happened, and paste any error messages.
