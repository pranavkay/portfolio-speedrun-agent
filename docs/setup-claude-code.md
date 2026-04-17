# Set Up Your Portfolio with Claude Code

This guide walks you through building your portfolio using Claude Code — an AI assistant that lives in your terminal (the black window where you type commands). You don't need to know how to code.

---

## What You'll Need

1. **Your content** — see [Content Kit](content-kit.md) for what to prepare
2. **A computer** (Mac, Windows, or Linux)
3. **Claude Code** installed — get it at [claude.ai/code](https://claude.ai/code)
4. **Node.js** installed — get it at [nodejs.org](https://nodejs.org) (click the big green button, install, done)

---

## Step-by-Step

### 1. Download the project

Open your terminal:
- **Mac**: press `Cmd + Space`, type "Terminal", press Enter
- **Windows**: press `Win + R`, type "cmd", press Enter

Then type these commands (copy-paste them one at a time):

```
git clone https://github.com/pranavkay/portfolio-speedrun-agent.git
cd portfolio-speedrun-agent
npm install
```

You'll see a bunch of text scroll by. That's normal — it's installing what the site needs to run.

### 2. Open Claude Code

In the same terminal window, type:

```
claude
```

This opens Claude Code. You'll see a prompt where you can type messages to the AI.

### 3. Tell Claude what you want

Type this:

```
Help me set up my portfolio. I'm a [your profession].
```

For example:
- "Help me set up my portfolio. I'm a wedding photographer based in NYC."
- "Help me set up my portfolio. I'm a freelance videographer."
- "Help me set up my portfolio. I'm a brand designer."

### 4. Answer Claude's questions

Claude will ask you for:
- Your name and professional title
- A short bio
- Your email and contact info
- Links to your best work
- What services you offer

Just answer naturally — Claude will handle all the technical stuff.

### 5. See your site

Claude will tell you when it's ready. You'll see something like:

```
Your site is running at http://localhost:3000
```

Open your web browser (Chrome, Safari, etc.) and go to that address. You should see your portfolio!

### 6. Make changes

Want to change something? Just tell Claude:

- "Change the colors to something more blue"
- "Remove the testimonials section"
- "Add my Behance link"
- "Make the hero section use this image: [URL]"

### 7. Go live

When you're happy with how it looks, tell Claude:

```
Help me deploy this site
```

Claude will walk you through putting it on the internet for free using Vercel.

---

## Common Questions

**"It says 'command not found' when I type 'claude'"**
Make sure Claude Code is installed. Visit [claude.ai/code](https://claude.ai/code) and follow the install instructions for your computer.

**"It says 'command not found' when I type 'npm'"**
You need to install Node.js first. Go to [nodejs.org](https://nodejs.org), download and install it, then try again.

**"The site looks weird / has placeholder content"**
That's because Claude hasn't added your content yet. Make sure you told it about your portfolio pieces, bio, and services.

**"I closed the terminal, how do I get back?"**
Open Terminal again, then type:
```
cd portfolio-speedrun-agent
claude
```
Tell Claude: "I was setting up my portfolio earlier, let's continue."

**"Can I change things after I've deployed?"**
Yes! Go to `/admin` on your live site (e.g. `yoursite.com/admin`) and log in with the password you set during setup. You can update everything from there.
