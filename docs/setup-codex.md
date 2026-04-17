# Set Up Your Portfolio with Codex

This guide walks you through building your portfolio using OpenAI's Codex — an AI coding assistant. You don't need to know how to code.

---

## What You'll Need

1. **Your content** — see [Content Kit](content-kit.md) for what to prepare
2. **A computer** (Mac, Windows, or Linux)
3. **Codex** installed — get it at [openai.com/codex](https://openai.com/codex)
4. **Node.js** installed — get it at [nodejs.org](https://nodejs.org)

---

## Step-by-Step

### 1. Download the project

Open your terminal:
- **Mac**: press `Cmd + Space`, type "Terminal", press Enter
- **Windows**: press `Win + R`, type "cmd", press Enter

Type these commands one at a time:

```
git clone https://github.com/pranavkay/portfolio-speedrun-agent.git
cd portfolio-speedrun-agent
npm install
```

Wait for it to finish (you'll see text scrolling — that's normal).

### 2. Open Codex

In the same terminal window, type:

```
codex
```

This opens the Codex assistant.

### 3. Tell Codex what you want

Type something like:

```
I want to set up my portfolio website. I'm a cinematographer based in LA.
```

Or:
- "Set up a photography portfolio for me"
- "I'm a graphic designer, help me build my portfolio site"

### 4. Answer its questions

Codex will ask for your details — name, bio, portfolio links, services. Answer naturally.

### 5. See your site

When Codex is done, run:

```
npm run dev
```

Then open your browser and go to `http://localhost:3000`.

### 6. Make changes

Tell Codex what you want changed:

- "I want darker colors"
- "Add my Instagram link: https://instagram.com/myhandle"
- "Change my tagline to 'Visual storyteller based in Brooklyn'"

### 7. Deploy

When you're happy, tell Codex:

```
Help me deploy this to Vercel
```

It'll walk you through the process.

---

## Common Questions

**"It says 'command not found'"**
Make sure both Codex and Node.js are installed. Check the links above.

**"My portfolio has placeholder content"**
The AI needs your actual content to work with. Make sure you share your portfolio links, bio, and services.

**"How do I update my site after it's live?"**
Visit `yoursite.com/admin` in your browser and log in. You can update everything from there without touching code.
