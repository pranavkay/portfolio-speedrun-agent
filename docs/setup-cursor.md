# Set Up Your Portfolio with Cursor

This guide walks you through building your portfolio using Cursor — a code editor with built-in AI. It has a visual interface, so it might feel more comfortable than a terminal-only tool.

---

## What You'll Need

1. **Your content** — see [Content Kit](content-kit.md) for what to prepare
2. **A computer** (Mac, Windows, or Linux)
3. **Cursor** installed — get it at [cursor.com](https://cursor.com) (free plan works fine)
4. **Node.js** installed — get it at [nodejs.org](https://nodejs.org)

---

## Step-by-Step

### 1. Download the project

Open your terminal:
- **Mac**: press `Cmd + Space`, type "Terminal", press Enter
- **Windows**: press `Win + R`, type "cmd", press Enter

Type these commands one at a time:

```
git clone https://github.com/example/portfolio-speedrun-agent.git
cd portfolio-speedrun-agent
npm install
```

### 2. Open in Cursor

Type this in the same terminal:

```
cursor .
```

Or open Cursor manually, click "Open Folder", and navigate to the `portfolio-speedrun-agent` folder.

### 3. Open the AI chat

Press `Cmd + L` (Mac) or `Ctrl + L` (Windows) to open Cursor's AI chat panel on the right side of the screen.

### 4. Tell Cursor what you want

Type in the chat:

```
I want to set up my portfolio website. I'm a [your profession] based in [your city]. Please read CLAUDE.md for instructions on how this project works.
```

### 5. Answer its questions

Cursor's AI will ask for your details. Answer in the chat — it will edit the files for you.

### 6. Preview your site

Open the terminal inside Cursor (press `` Ctrl + ` ``) and type:

```
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 7. Make changes

In the Cursor chat, say things like:

- "Change the accent color to blue"
- "Update my bio to: [your new bio]"
- "Add a new portfolio piece: [YouTube link]"

You'll see Cursor edit the files in real-time on the left side of the screen.

### 8. Deploy

In the chat, say:

```
Help me deploy this to Vercel for free
```

---

## Tips for Cursor

- **You can see what's changing.** Unlike terminal-only tools, Cursor shows you the code changes on the left as the AI works. Green = added, red = removed.
- **You can undo.** Press `Cmd + Z` (Mac) or `Ctrl + Z` (Windows) to undo any change.
- **Point at files.** You can drag a file from the left sidebar into the chat to say "look at this file."
- **The CLAUDE.md file is your friend.** It tells the AI everything it needs to know about this project.

## Common Questions

**"Cursor doesn't seem to understand the project"**
Tell it: "Read the CLAUDE.md file first, then help me set up my portfolio."

**"Changes aren't showing on my site"**
Make sure the dev server is running (`npm run dev` in the terminal). If it is, try refreshing the browser.

**"How do I update my site after deployment?"**
Visit `yoursite.com/admin` in your browser. The admin panel lets you change everything without code.
