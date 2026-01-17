# ERM Language Support for VS Code
🌐 Language Version: [中文](README.md)

A VS Code extension providing full support for ERM (Heroes of Might and Magic) scripting — migrated from Sublime Text ERM tooling (ErmToggleCodeComment, ErmFormatInlineComment, syntax/completion/snippet files). It includes syntax highlighting, code snippets, auto-completion, comment toggling/formatting, and more.

## 🚀 Features
### Full ERM Script Support
- **Syntax Highlighting**: Exact replication of Sublime Text's `erm.sublime-syntax` for `.erm` files (keywords, variables, comments).
- **Code Snippets**: Predefined snippets for common ERM commands (if/else, set, on, re, etc.) — migrated from `erm_*.sublime-snippet`.
- **Auto-Completion**: Smart completion for ERM keywords, constants, triggers, and standard functions — migrated from `erm_*.sublime-completions`.
- **Comment Tools**:
  - Toggle Comments: Switch ERM command comment status (`!! ↔ *!`, `!? ↔ *?`, `!$ ↔ *$`, `!# ↔ *#`).
  - Format Comments: Align inline comments (fixed/adaptive indent), replace `//` with `[]`, auto-collect variables to comments.

### Keyboard Shortcuts
| Feature                  | Windows/Linux | macOS          |
|--------------------------|---------------|----------------|
| Toggle ERM Code Comment  | `Ctrl+Alt+C`  | `Cmd+Alt+C`    |
| Format Inline Comment    | `Alt+F`       | `Option+F`     |

## 📦 Installation
### Option 1: Install from VSIX (Recommended)
1. Download the latest `erm-language-support-x.x.x.vsix` from the [Releases](https://github.com/kouyx/ERM-language-support-for-VS-code/releases) page.
2. Open VS Code → Extensions (`Ctrl+Shift+X`) → Click `...` (top-right) → `Install from VSIX...` → Select the downloaded VSIX file.

### Option 2: Build from Source (For Development)
> ⚠️ On Windows, avoid using Git Bash for compilation (it may trigger path resolution errors) — CMD/PowerShell is recommended.
1. Clone the repository:
   ```bash
   git clone https://github.com/kouyx/ERM-language-support-for-VS-code.git
   cd erm-language-support