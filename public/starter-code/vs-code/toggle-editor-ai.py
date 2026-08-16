#!/usr/bin/env python3
"""Turn VS Code editor AI off or on in user settings.

Usage:
    python3 toggle-editor-ai.py off
    python3 toggle-editor-ai.py on

This writes a marked block into settings.json. It does not uninstall extensions.
Reload VS Code after it runs.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

START = "// --- csci338-ai-off ---"
END = "// --- csci338-ai-off-end ---"

BLOCK = """    // --- csci338-ai-off ---
    "chat.disableAIFeatures": true,
    "github.copilot.enable": {
        "*": false
    },
    "github.copilot.editor.enableAutoCompletions": false,
    "github.copilot.nextEditSuggestions.enabled": false,
    "extensions.allowed": {
        "*": true,
        "GitHub.copilot": false,
        "GitHub.copilot-chat": false,
        "GitHub.copilot-workspace": false,
        "openai.chatgpt": false,
        "anthropic.claude-code": false,
        "saoudrizwan.claude-dev": false,
        "rooveterinaryinc.roo-cline": false,
        "Continue.continue": false,
        "AmazonWebServices.amazon-q-vscode": false,
        "TabNine.tabnine-vscode": false,
        "Codeium.codeium": false,
        "sourcegraph.cody-ai": false,
        "supermaven.supermaven": false,
        "google.geminicodeassist": false
    },
    // --- csci338-ai-off-end ---
"""


def candidate_settings_files():
    extra = os.environ.get("CSCI338_SETTINGS_JSON")
    if extra:
        return [Path(extra).expanduser()]

    home = Path.home()
    candidates = [
        home / "Library/Application Support/Code/User/settings.json",
        home / "Library/Application Support/Code - Insiders/User/settings.json",
        home / ".config/Code/User/settings.json",
        home / ".config/Code - Insiders/User/settings.json",
        home / ".vscode-server/data/User/settings.json",
        home / ".vscode-server-insiders/data/User/settings.json",
    ]

    appdata = os.environ.get("APPDATA")
    if appdata:
        base = Path(appdata)
        candidates.extend(
            [
                base / "Code/User/settings.json",
                base / "Code - Insiders/User/settings.json",
            ]
        )

    win_user = os.environ.get("USER") or os.environ.get("USERNAME")
    if win_user:
        win_base = Path("/mnt/c/Users") / win_user / "AppData/Roaming"
        candidates.extend(
            [
                win_base / "Code/User/settings.json",
                win_base / "Code - Insiders/User/settings.json",
            ]
        )

    found = []
    seen = set()
    for path in candidates:
        resolved = path.expanduser()
        key = str(resolved)
        if key in seen:
            continue
        seen.add(key)
        found.append(resolved)
    return found


def strip_block(text):
    start = text.find(START)
    end = text.find(END)
    if start == -1 or end == -1 or end < start:
        return text
    end = end + len(END)
    line_start = text.rfind("\n", 0, start)
    if line_start == -1:
        line_start = start
    if end < len(text) and text[end] == "\r":
        end += 1
    if end < len(text) and text[end] == "\n":
        end += 1
    return text[:line_start] + text[end:]


def insert_block(text):
    text = strip_block(text)
    stripped = text.strip()
    if stripped == "":
        return "{\n" + BLOCK + "}\n"
    if not stripped.startswith("{"):
        raise ValueError("settings.json does not start with {")
    brace = text.find("{")
    return text[: brace + 1] + "\n" + BLOCK + text[brace + 1 :]


def backup(path):
    bak = path.with_name(path.name + ".csci338.bak")
    if path.is_file():
        bak.write_text(path.read_text(encoding="utf-8"), encoding="utf-8")
    return bak


def apply(path, mode):
    if path.is_file():
        original = path.read_text(encoding="utf-8")
    else:
        original = "{\n}\n"

    if mode == "off":
        if START in original:
            return "already off"
        updated = insert_block(original)
        action = "turned off"
    elif mode == "on":
        if START not in original:
            return "already on (no course AI-off block)"
        updated = strip_block(original)
        action = "turned on"
    else:
        raise ValueError(mode)

    backup(path)
    path.write_text(updated, encoding="utf-8")
    return action


def main(argv):
    if len(argv) != 2 or argv[1] not in {"off", "on"}:
        print("Turn editor AI off or on in VS Code user settings.", file=sys.stderr)
        print("Usage: python3 toggle-editor-ai.py off", file=sys.stderr)
        print("       python3 toggle-editor-ai.py on", file=sys.stderr)
        return 2

    mode = argv[1]
    files = [p for p in candidate_settings_files() if p.is_file()]

    if not files:
        print("No VS Code settings.json found.")
        print("Open VS Code, then Command Palette -> Preferences: Open User Settings (JSON).")
        print("Save that file once, and run this script again.")
        return 1

    print("AI %s:" % mode)
    for path in files:
        try:
            result = apply(path, mode)
        except ValueError as err:
            print("  skip %s (%s)" % (path, err))
            continue
        print("  %s: %s" % (result, path))

    print()
    print("Reload VS Code: Command Palette -> Developer: Reload Window")
    if mode == "off":
        print("Copilot, Codex, Claude, Continue, and similar extensions should stay disabled.")
        print("This applies to VS Code user settings, so it stays off in every folder.")
        print("Cursor is an AI editor. Use VS Code if you want a no-AI workspace.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
