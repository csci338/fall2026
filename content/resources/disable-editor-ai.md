---
title: Turn Off Editor AI
group: Code Editors
group_order: 1
order: 4
---

VS Code now ships with Copilot chat, inline suggestions, and a lot of prompts. Other extensions (Codex, Claude, Continue, Amazon Q, Tabnine, Codeium, Gemini) add more.

You can turn those **off for every project** in your user settings. That stays off after you restart VS Code.

This does **not** block ChatGPT or Claude in a browser. Close those tabs yourself when an assignment says no GenAI.

If you use **Cursor**, switch to [VS Code](/resources/vs-code) for no-AI work. Cursor is an AI editor.

## Fastest: hide built-in Copilot

This hides VS Code’s own Copilot chat and inline suggestions.

1. Open the Command Palette: <span class="os-icon mac" title="Mac"><i class="fa-brands fa-apple" aria-hidden="true"></i><span class="sr-only">Mac</span></span> Shift + CMD + P or <span class="os-icon windows" title="Windows"><i class="fa-brands fa-windows" aria-hidden="true"></i><span class="sr-only">Windows</span></span> Shift + CTRL + P
1. Run **Chat: Learn How to Hide AI Features**
1. Turn on **Chat: Disable AI Features**
1. Reload the window if VS Code asks

Same setting in `settings.json`:

```json
"chat.disableAIFeatures": true
```

That setting is enough for Copilot. It does **not** disable Codex, Claude, Continue, and similar extensions.

## Recommended: run the course toggle

The script writes a marked block into your **user** `settings.json`. It:

* hides built-in Copilot
* blocks common AI extensions so they stay disabled

Download [toggle-editor-ai.py](/starter-code/vs-code/toggle-editor-ai.py).

**Off** (stays off until you turn it back on):

```bash
python3 toggle-editor-ai.py off
```

**On** (removes the course block):

```bash
python3 toggle-editor-ai.py on
```

Then reload: Command Palette → **Developer: Reload Window**.

The script looks for VS Code settings on Mac, Linux, and WSL. It copies `settings.json` to `settings.json.csci338.bak` before it edits.

## Paste it yourself

If you would rather not run a script, open **Preferences: Open User Settings (JSON)** and paste this inside the curly braces. Keep a comma between settings.

```json
"chat.disableAIFeatures": true,
"github.copilot.enable": { "*": false },
"github.copilot.editor.enableAutoCompletions": false,
"extensions.allowed": {
    "*": true,
    "GitHub.copilot": false,
    "GitHub.copilot-chat": false,
    "openai.chatgpt": false,
    "anthropic.claude-code": false,
    "saoudrizwan.claude-dev": false,
    "Continue.continue": false,
    "AmazonWebServices.amazon-q-vscode": false,
    "TabNine.tabnine-vscode": false,
    "Codeium.codeium": false,
    "google.geminicodeassist": false
}
```

`extensions.allowed` with `"*": true` still lets you install normal extensions. The listed AI extensions are blocked.

## Check that it worked

1. Reload VS Code.
1. The Copilot / chat icon in the title bar should be gone or inactive.
1. Typing in a file should not show gray AI ghost text.
1. Extensions view should show Copilot, Codex, and Claude as disabled if they were installed.

To turn AI back on, run `python3 toggle-editor-ai.py on` or delete those keys from `settings.json`.
