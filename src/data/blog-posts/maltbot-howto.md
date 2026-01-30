# How to Set Up Maltbot in a VM How-To

This guide shows how to run Maltbot (formerly Claudebot) in a sandboxed, secure setup, with access to thousands of apps via Zapier MCP, without giving an AI full control of your real computer.

**Source:** video transcript from [this](https://www.youtube.com/watch?v=mDsyFrQPPfg) video by [Creator Magic](https://www.youtube.com/@CreatorMagicAI)

> **DISCLAIMER**: This post is adapted from a tutorial by Mike, who is credited as the original author. It is provided for educational purposes only. Running AI agents with system access involves security, privacy, and cost risks. The setup described here aims to reduce those risks but does not eliminate them. Use at your own discretion and responsibility.  

## Why This Setup?

### Problems with a naive Maltbot install:

- Giving an AI full control of your main computer is risky
- Native integrations (Gmail, Calendar, etc.) require complex cloud setup
- Prompt injection and tool abuse are real threats

### Solution:

- Run Maltbot inside a virtual Mac
- Use Zapier MCP as a secure integration layer
- Give limited, revocable access to apps
- Keep your real machine isolated

## Architecture Overview

- **Host Mac:** your real computer
- **UTM:** runs a virtual macOS instance
- **Virtual Mac:** where Maltbot lives
- **Zapier MCP:** holds your app credentials
- **Telegram:** chat interface to Maltbot

> If Maltbot misbehaves, it can only affect the virtual machine.

## Step 1: Install UTM (Virtual Machine)

1. Download UTM (free, open source)
2. Drag it into `/Applications`
3. Open UTM

## Step 2: Create a Virtual macOS Machine

1. Click **Create New**
2. Choose **Virtualize**
3. Select **macOS 12+** (preconfigured)
4. Leave CPU and memory at defaults
5. Click **Continue** until finished
6. Save the VM

After a few minutes, macOS will be cloned inside your Mac.

## Step 3: First Boot of the Virtual Mac

1. Press **Play** in UTM
2. Go through standard macOS setup:
   - Set up as New Mac
   - Skip Apple ID
   - Choose Dark Mode (optional)
   - Name the Mac (example: `Malti`)

You now have a clean, isolated Mac environment.

## Step 4: Install Google Chrome (Optional but Recommended)

Inside the virtual Mac:

1. Download and install Chrome
2. This allows Maltbot to control a browser later if needed

## Step 5: Install Maltbot

1. Visit the Maltbot website
2. Copy the one-line install command
3. Open Terminal inside the virtual Mac
4. Run:

```bash
sudo <install-command>
```

5. Enter your password
6. Wait for dependencies to install

Maltbot installs fully via this single command.

## Step 6: Quick Start Configuration

When prompted:

1. Confirm you understand the risks
2. Choose **Quick Start**
3. Select **Anthropic** as the AI provider

## Step 7: Create an Anthropic API Key

1. Log into the Claude Console
2. Go to **API Keys**
3. Create a new key
4. Paste it into the setup prompt
5. Select model: **Claude Sonnet 4.0.5**

This is the only required “technical” step.

## Step 8: Connect Telegram (Chat Interface)

1. Open Telegram
2. Start a chat with `@BotFather`
3. Run: `/newbot`
4. Name your bot
5. Copy the token
6. Paste the token into Maltbot

Maltbot is now reachable from anywhere via Telegram.

## Step 9: Configure Skills (Important)

When asked to configure skills:

**Say yes to:**
- Keep default package manager (npm)
- Enable MC Porter (this is the bridge to Zapier MCP)

**Say no to:**
- Google Places
- Gemini
- OpenAI
- Whisper
- ElevenLabs (for now)

Then:
- Skip hooks
- Let the gateway service install

## Step 10: Hatch Maltbot

You'll see the "Tamagotchi moment":

- Maltbot wakes up
- Fresh memory
- Ready to learn who you are

You can now chat with it via Telegram.

## Step 11: Set Up Zapier MCP (Secure App Access)

**In Zapier:**

1. Create a new MCP client
2. Name it (example: `multi-server`)
3. Add a single test tool:
   - Gmail → Create Draft
4. Generate the MCP connection token

Zapier works even on the free plan and offers 8000+ integrations.

**In Maltbot:**

Ask:
```
can you connect to my zapier mcp?
```

Then:
1. Paste the Zapier MCP connection details
2. Maltbot auto-configures the server
3. No manual wiring needed

## Step 12: Test with Gmail

Send:
```
draft email about health benefits of papaya
```

**Result:**
- Maltbot creates a Gmail draft
- Uses Zapier MCP
- No direct Gmail credentials stored in Maltbot

## Step 13: Add More Tools (Optional)

Back in Zapier:

1. Add Notion
2. Add ElevenLabs
3. Select all tools if you're comfortable

Maltbot automatically discovers new capabilities.

## Step 14: Multi-Tool Task Example

Send:
```
make me a notion page about papayas with nice images from the web and a 10 second voiceover
```

**What happens:**
- Maltbot opens a browser
- Finds images
- Creates a Notion page
- Generates audio via ElevenLabs
- Embeds everything automatically
- All inside the virtual Mac

## Costs

Entire demo cost: **$0.77**

- Heavy daily usage will add up
- Light, high-leverage usage is cheap

## Why This Setup Works

✅ AI never touches your real computer  
✅ Credentials live in Zapier, not Maltbot  
✅ Access is granular and revocable  
✅ Full automation power  
✅ Beginner-friendly

Final Notes
## Final Notes

This setup gives you:

- Memory-enabled AI
- Secure app access
- Full OS control
- Strong isolation

All without cloud VMs, extra hardware, or complex DevOps.